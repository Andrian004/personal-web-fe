import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Annoyed, UserRound } from "lucide-react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CommentForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  const { id: projectId } = useParams();
  const [focused, setFocused] = useState(false);
  const [emoji, setEmoji] = useState("");

  const commentForm = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      message: "",
    },
  });

  const commentMutation = useMutation({
    mutationFn: (formData: z.infer<typeof commentSchema>) =>
      postApi("/comment", formData, token),
    onSuccess: () => {
      commentForm.reset();
      queryClient.invalidateQueries({ queryKey: ["reply", projectId] });
    },
    onError: () => {
      toast.error("Comment failed!");
    },
  });

  useEffect(() => {
    // Update input value when emoji is selected
    if (emoji) {
      const prevValue = commentForm.getValues().message;
      commentForm.setValue("message", prevValue + emoji);
      setEmoji("");
    }
  }, [commentForm, emoji]);

  const handleComment = (data: z.infer<typeof commentSchema>) => {
    if (data.message.length === 0) return;
    if (!token || !user) return navigate("/account");

    const commentData = {
      projectId,
      uuid: user.userId,
      message: data.message,
    };
    commentMutation.mutate(commentData);
  };

  return (
    <Form {...commentForm}>
      <form
        onSubmit={commentForm.handleSubmit(handleComment)}
        className="flex items-start gap-x-2"
      >
        {user ? (
          <CustomAvatar src="" fallback={user.username[0]} />
        ) : (
          <UserRound className="size-11 bg-gray-200 dark:bg-gray-600 rounded-full p-2" />
        )}
        <div className="w-full flex flex-col">
          <FormInput
            form={commentForm}
            name="message"
            placeholder="Add a comment..."
            controlStyle="w-full h-min bg-transparent border-x-0 border-t-0 border-b-neutral-300 dark:border-b-white/50 rounded-none px-0 py-1 m-0 focus-visible:ring-0 focus-visible:border-b-neutral-900 dark:focus-visible:border-b-white focus-visible:ring-offset-0"
            onFocus={() => setFocused(true)}
            autoComplete="off"
          />
          {focused && (
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
                  onClick={() => setFocused(false)}
                  disabled={commentMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gray"
                  size="roundSm"
                  disabled={commentMutation.isPending}
                >
                  Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
