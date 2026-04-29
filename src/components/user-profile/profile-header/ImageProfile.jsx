"use client";
import { useState } from "react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { ImageDialog } from "./ImageDialog";

export const ImageProfile = ({ user }) => {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);

  const onClick = (e) => {
    setIsHovering(false);
  };

  return (
    <Avatar
      className="relative h-24 w-24 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AvatarImage
        src={user?.imageThumb ?? "/images/profile/profile.jpg"}
        className={isHovering ? "blur-sm" : "blur-none"}
        alt="@shadcn"
      />
      <ImageDialog
        oldImage={user?.imageThumb}
        isHovering={isHovering}
        onClick={onClick}
      />
    </Avatar>
  );
};
