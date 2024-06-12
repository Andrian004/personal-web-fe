import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Annoyed } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/schemas/comment-schema";
import { useAuth } from "@/hooks/use-auth";
import { postApi } from "@/lib/fetcher";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { CustomAvatar } from "@/components/custom-avatar";
import { Button } from "@/components/ui/button";
import { EmojisDialog } from "@/components/dialog/emojis-dialog";
import { FormInput } from "@/components/form/form-input";

interface ReplyFormProps {
  commentId: string;
  tag?: string;
  handleClose: () => void;
  refetch?: () => void;
}

export function ReplyForm({
  commentId,
  tag,
  handleClose,
  refetch,
}: ReplyFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  const { id: projectId } = useParams();
  const [emoji, setEmoji] = useState("");

  const replyForm = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      message: tag ? `@${tag} ` : "",
    },
  });

  const replyMutation = useMutation({
    mutationFn: (formData: z.infer<typeof commentSchema>) =>
      postApi("/comment/reply", formData, token),
    onSuccess: () => {
      replyForm.reset();
      queryClient.invalidateQueries({ queryKey: ["reply", projectId] });
      if (refetch) refetch();
    },
    onError: () => {
      toast.error("Comment failed!");
    },
  });

  useEffect(() => {
    // Update input value when emoji is selected
    if (emoji) {
      const prevValue = replyForm.getValues().message;
      replyForm.setValue("message", prevValue + emoji);
      setEmoji("");
    }
  }, [replyForm, emoji]);

  const handleComment = (data: z.infer<typeof commentSchema>) => {
    if (data.message.length === 0) return;
    if (!token || !user) return navigate("/account");

    const commentData = {
      projectId,
      uuid: user.userId,
      message: data.message,
      groupId: commentId,
    };
    replyMutation.mutate(commentData);
  };
  return (
    <Form {...replyForm}>
      <form
        onSubmit={replyForm.handleSubmit(handleComment)}
        className="flex gap-x-2"
      >
        <CustomAvatar
          src=""
          fallback={user ? user.username[0] : "G"}
          className="size-7"
        />
        <div className="w-full flex flex-col">
          <FormInput
            form={replyForm}
            name="message"
            placeholder="Reply comment..."
            controlStyle="w-full h-min bg-transparent border-x-0 border-t-0 border-b-neutral-300 dark:border-b-white/50 rounded-none px-0 py-0 focus-visible:ring-0 focus-visible:border-b-neutral-900 dark:focus-visible:border-b-white focus-visible:ring-offset-0"
            autoComplete="off"
          />
          <div className="flex justify-between items-center">
            <EmojisDialog
              onEmojiClick={(emojiData) => setEmoji(emojiData.emoji)}
            >
              <Button
                type="button"
                variant="ghost"
                size="min"
                className="p-0 m-0"
              >
                <Annoyed className="size-6" />
              </Button>
            </EmojisDialog>
            <div className="flex gap-x-2">
              <Button
                type="button"
                variant="ghost"
                size="roundSm"
                onClick={handleClose}
                disabled={replyMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gray"
                size="roundSm"
                disabled={replyMutation.isPending}
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
