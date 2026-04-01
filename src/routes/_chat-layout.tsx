import React from "react";
import { Outlet, createFileRoute, useParams } from "@tanstack/react-router";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatProvider, useSharedChat } from "@/hooks/useSharedChat";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputSpeechButton,
  PromptInputAttachments,
  PromptInputButton,
  usePromptInputAttachments,
  PromptInputHeader,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { ImageIcon, XIcon } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

export const Route = createFileRoute("/_chat-layout")({
  component: ChatLayout,
});

function PromptInputFileButton({ disabled }: { disabled?: boolean }) {
  const { openFileDialog } = usePromptInputAttachments();
  return (
    <PromptInputButton
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        openFileDialog();
      }}
    >
      <ImageIcon className="size-4" />
    </PromptInputButton>
  );
}

function ImagePreview({ file }: { file: any }) {
  const { remove } = usePromptInputAttachments();
  return (
    <div className="relative group size-16 rounded-xl overflow-hidden border bg-muted shadow-sm flex-shrink-0">
      <img
        src={file.url}
        alt="preview"
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          remove(file.id);
        }}
        className="absolute top-1 right-1 size-5 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <XIcon className="size-3" />
      </button>
    </div>
  );
}

function ChatLayout() {
  return (
    <ChatProvider>
      <ChatLayoutInner />
    </ChatProvider>
  );
}

function ChatLayoutInner() {
  const {
    allSessions,
    isLoadingConversations,
    input,
    setInput,
    isLoading,
    handleSubmit,
  } = useSharedChat();

  const params = useParams({ strict: false });
  const currentChatId = params.chatId || null;

  const currentChatTitle =
    allSessions.find((s) => s.id === currentChatId)?.title ||
    (currentChatId ? "Conversation" : "New Chat");

  return (
    <SidebarProvider>
      <ChatSidebar
        chatSessions={allSessions}
        currentChatId={currentChatId}
        isLoading={isLoadingConversations}
      />
      <SidebarInset className="flex flex-col h-dvh bg-background">
        {/* Fixed Header */}
        <header className="border-b bg-background px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold truncate px-1">
              {currentChatTitle}
            </h1>
          </div>
          <div id="chat-header-actions" className="flex items-center shrink-0" />
        </header>

        {/* Unified Scrollable Area */}
        <Conversation className="flex-1 overflow-y-auto">
          <ConversationContent className="p-0">
            <Outlet />
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Shared Fixed Input area */}
        <div className="border-t p-4 bg-background">
          <PromptInput onSubmit={handleSubmit} accept="image/*">
            <PromptInputHeader>
              <PromptInputAttachments>
                {(file) => <ImagePreview key={file.id} file={file} />}
              </PromptInputAttachments>
            </PromptInputHeader>
            <PromptInputTextarea
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputFileButton disabled={isLoading} />
                <PromptInputSpeechButton
                  onTranscriptionChange={(transcript: string) =>
                    setInput(input + (input ? " " : "") + transcript)
                  }
                  disabled={isLoading}
                />
              </PromptInputTools>
              <PromptInputSubmit disabled={isLoading} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
