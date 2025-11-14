import { Suspense } from "react";
import AuthSuccessContent from "./success-content";

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<div>Signing in...</div>}>
      <AuthSuccessContent />
    </Suspense>
  );
}
