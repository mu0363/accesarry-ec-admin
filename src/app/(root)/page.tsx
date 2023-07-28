"use client";

import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <Modal
        title="Test"
        description="Test description"
        onClose={() => {}}
        isOpen
      >
        This is a Children
      </Modal>
    </div>
  );
}
