import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  AddSlideRequest,
  Draft,
  DraftListItem,
  ReorderSlidesRequest,
  Slide,
  UpdateDraftRequest,
} from "@/types";
import { api } from "./api";

const getDraft = async (draftId: string): Promise<Draft> => {
  const { data } = await api.get<{ success: boolean; draft: Draft }>(
    `/drafts/${draftId}`
  );
  return data.draft;
};

export const useDraft = (draftId: string) => {
  return useQuery<Draft, Error>({
    queryKey: ["draft", draftId],
    queryFn: () => getDraft(draftId),
    enabled: !!draftId,
    staleTime: 30000,
    retry: 2,
  });
};

const getUserDrafts = async (): Promise<DraftListItem[]> => {
  const { data } = await api.get<{
    success: boolean;
    drafts: DraftListItem[];
  }>("/drafts");
  return data.drafts;
};

export const useUserDrafts = () => {
  return useQuery<DraftListItem[], Error>({
    queryKey: ["drafts"],
    queryFn: getUserDrafts,
    staleTime: 60000,
  });
};

const updateDraft = async ({
  draftId,
  data,
}: {
  draftId: string;
  data: UpdateDraftRequest;
}): Promise<Draft> => {
  const res = await api.put<Draft>(`/drafts/${draftId}`, data);
  return res.data;
};

export const useUpdateDraft = (draftId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    Draft,
    AxiosError<{ message: string }>,
    UpdateDraftRequest,
    { previousDraft?: Draft }
  >({
    mutationFn: (data) => updateDraft({ draftId, data }),

    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ["draft", draftId] });

      const previousDraft = queryClient.getQueryData<Draft>(["draft", draftId]);

      if (previousDraft) {
        queryClient.setQueryData<Draft>(["draft", draftId], {
          ...previousDraft,
          ...updatedData,
        });
      }

      return { previousDraft };
    },

    onError: (error, _variables, context) => {
      if (context?.previousDraft) {
        queryClient.setQueryData(["draft", draftId], context.previousDraft);
      }
      console.error("Failed to update draft:", error.response?.data || error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["draft", draftId] });
    },
  });
};

const updateSlide = async ({
  draftId,
  slideId,
  data,
}: {
  draftId: string;
  slideId: string;
  data: Partial<Slide>;
}): Promise<void> => {
  await api.put(`/drafts/${draftId}/slides/${slideId}`, data);
};

export const useUpdateSlide = (draftId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    { slideId: string; data: Partial<Slide> },
    { previousDraft?: Draft }
  >({
    mutationFn: ({ slideId, data }) => updateSlide({ draftId, slideId, data }),

    onMutate: async ({ slideId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["draft", draftId] });

      const previousDraft = queryClient.getQueryData<Draft>(["draft", draftId]);

      if (previousDraft) {
        queryClient.setQueryData<Draft>(["draft", draftId], {
          ...previousDraft,
          slides: previousDraft.slides.map((slide) =>
            slide.id === slideId ? { ...slide, ...data } : slide
          ),
        });
      }

      return { previousDraft };
    },

    onError: (error, variables, context) => {
      if (context?.previousDraft) {
        queryClient.setQueryData(["draft", draftId], context.previousDraft);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["draft", draftId] });
    },
  });
};

const addSlide = async ({
  draftId,
  data,
}: {
  draftId: string;
  data: AddSlideRequest;
}): Promise<Slide> => {
  const response = await api.post<{ success: boolean; slide: Slide }>(
    `/drafts/${draftId}/slides`,
    data
  );
  return response.data.slide;
};

export const useAddSlide = (draftId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Slide, AxiosError<{ message: string }>, AddSlideRequest>({
    mutationFn: (data) => addSlide({ draftId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["draft", draftId] });
    },
  });
};

const deleteSlide = async ({
  draftId,
  slideId,
}: {
  draftId: string;
  slideId: string;
}): Promise<void> => {
  await api.delete(`/drafts/${draftId}/slides/${slideId}`);
};

export const useDeleteSlide = (draftId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    string,
    { previousDraft?: Draft }
  >({
    mutationFn: (slideId) => deleteSlide({ draftId, slideId }),

    onMutate: async (slideId) => {
      await queryClient.cancelQueries({ queryKey: ["draft", draftId] });

      const previousDraft = queryClient.getQueryData<Draft>(["draft", draftId]);

      if (previousDraft) {
        queryClient.setQueryData<Draft>(["draft", draftId], {
          ...previousDraft,
          slides: previousDraft.slides
            .filter((slide) => slide.id !== slideId)
            .map((slide, index) => ({ ...slide, position: index })),
        });
      }

      return { previousDraft };
    },

    onError: (error, variables, context) => {
      if (context?.previousDraft) {
        queryClient.setQueryData(["draft", draftId], context.previousDraft);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["draft", draftId] });
    },
  });
};

const reorderSlides = async ({
  draftId,
  data,
}: {
  draftId: string;
  data: ReorderSlidesRequest;
}): Promise<void> => {
  await api.put(`/drafts/${draftId}/slides/reorder`, data);
};

export const useReorderSlides = (draftId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    ReorderSlidesRequest,
    { previousDraft?: Draft }
  >({
    mutationFn: (data) => reorderSlides({ draftId, data }),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["draft", draftId] });

      const previousDraft = queryClient.getQueryData<Draft>(["draft", draftId]);

      if (previousDraft) {
        const reorderedSlides = data.slideOrder
          .map((slideId, index) => {
            const slide = previousDraft.slides.find((s) => s.id === slideId);
            return slide ? { ...slide, position: index } : null;
          })
          .filter((slide): slide is Slide => slide !== null);

        queryClient.setQueryData<Draft>(["draft", draftId], {
          ...previousDraft,
          slides: reorderedSlides,
        });
      }

      return { previousDraft };
    },
    onError: (error, variables, context) => {
      if (context?.previousDraft) {
        queryClient.setQueryData(["draft", draftId], context.previousDraft);
      }
    },
  });
};

const deleteDraft = async (draftId: string): Promise<void> => {
  await api.delete(`/drafts/${draftId}`);
};

export const useDeleteDraft = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: deleteDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });
};

const generatePPTX = async (
  draftId: string
): Promise<{ downloadUrl: string }> => {
  const { data } = await api.post<{
    success: boolean;
    downloadUrl: string;
  }>(`/presentations/from-draft/${draftId}`);
  return data;
};

export const useGeneratePPTX = () => {
  return useMutation<
    { downloadUrl: string },
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: generatePPTX,
    onSuccess: (data) => {
      window.location.href = data.downloadUrl;
    },
    onError: (error) => {
      console.error("Generate PPTX error:", error.response?.data?.message);
    },
  });
};

//create draft
export const createDraft = async (body: {
  topic: string;
  language: string;
  themeSlug: string;
}): Promise<{ draftId: string }> => {
  const { data } = await api.post(`/drafts`, body);

  return { draftId: data.draft.id }; // 👈 extract correctly
};

export const useCreateDraft = () => {
  return useMutation<
    { draftId: string },
    AxiosError<{ message: string }>,
    { topic: string; language: string; themeSlug: string }
  >({
    mutationFn: createDraft,
  });
};
