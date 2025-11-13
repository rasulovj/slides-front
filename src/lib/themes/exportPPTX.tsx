// src/services/exportService.ts
import { pdf } from "@react-pdf/renderer";
import axios from "axios";
import { SlideLayoutProps } from "./types";
import { api } from "@/services";

interface ExportOptions {
  slides: SlideLayoutProps["slide"][];
  theme: SlideLayoutProps["theme"];
  themeId: string;
  title: string;
  draftId: string;
  SlidePDFComponent: React.ComponentType<{
    slides: SlideLayoutProps["slide"][];
    theme: SlideLayoutProps["theme"];
    themeId: string;
  }>;
}

export const generatePDFBlob = async (
  options: ExportOptions
): Promise<Blob> => {
  console.log("📄 Generating PDF...");

  const pdfDocument = (
    <options.SlidePDFComponent
      slides={options.slides}
      theme={options.theme}
      themeId={options.themeId}
    />
  );

  const blob = await pdf(pdfDocument).toBlob();
  console.log(`✅ PDF generated: ${blob.size} bytes`);
  return blob;
};

export const convertPDFToPPTX = async (
  pdfBlob: Blob,
  draftId: string,
  title: string
): Promise<{ downloadUrl: string; presentation: any }> => {
  const apiUrl = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:8080";

  const formData = new FormData();
  formData.append("pdf", pdfBlob, `${title}.pdf`);
  formData.append("draftId", draftId);
  formData.append("title", title);

  try {
    const response = await api.post(
      `${apiUrl}/api/export/pdf-to-pptx`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        timeout: 120000,
      }
    );

    console.log("✅ Conversion successful:", response.data);

    return {
      downloadUrl: response.data.downloadUrl,
      presentation: response.data.presentation,
    };
  } catch (error: any) {
    console.error("❌ Conversion error:");
    console.error("   Status:", error.response?.status);
    console.error(
      "   Message:",
      error.response?.data?.message || error.message
    );
    console.error("   Full error:", error.response?.data);

    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to convert PDF to PPTX"
    );
  }
};

export const exportPDFAsPPTX = async (
  options: ExportOptions
): Promise<void> => {
  try {
    console.log("🚀 Starting PDF to PPTX export...");
    console.log("   Title:", options.title);
    console.log("   Draft ID:", options.draftId);
    console.log("   Slides:", options.slides.length);

    const pdfBlob = await generatePDFBlob(options);

    const { downloadUrl } = await convertPDFToPPTX(
      pdfBlob,
      options.draftId,
      options.title
    );

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${options.title}.pptx`;
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("✅ PPTX downloaded successfully");
  } catch (error: any) {
    console.error("❌ Export error:", error.message);
    throw error;
  }
};

export const exportPDFOnly = async (options: ExportOptions): Promise<void> => {
  try {
    const pdfBlob = await generatePDFBlob(options);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = `${options.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  } catch (error: any) {
    console.error("❌ PDF export error:", error.message);
    throw error;
  }
};
