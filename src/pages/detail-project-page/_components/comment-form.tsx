import { useState } from "react";
import { Annoyed } from "lucide-react";

import { CustomAvatar } from "@/components/custom-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmojisDialog } from "@/components/dialog/emojis-dialog";
import { EmojiClickData } from "emoji-picker-react";

export function CommentForm() {
  const [focused, setFocused] = useState(false);
  const [emoji, setEmoji] = useState("");

  return (
    <form className="flex gap-x-2">
      <CustomAvatar
        src="https://avatars.githubusercontent.com/u/128672158?s=400&u=3b5a63f174ccfe0a6b401d0a515756adba20e8eb&v=4"
        fallback="A"
      />
      <div className="w-full flex flex-col gap-y-2">
        <Input
          type="text"
          placeholder="Add a comment..."
          className="w-full h-min bg-transparent border-x-0 border-t-0 border-b-neutral-300 dark:border-b-white/50 rounded-none px-0 py-1 focus-visible:ring-0 focus-visible:border-b-neutral-900 dark:focus-visible:border-b-white focus-visible:ring-offset-0"
          onFocus={() => setFocused(true)}
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
              >
                Cancel
              </Button>
              <Button type="submit" variant="gray" size="roundSm">
                Comment
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
