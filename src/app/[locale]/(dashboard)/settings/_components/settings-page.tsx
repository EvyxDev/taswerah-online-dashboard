"use client";

import { useTranslations } from "next-intl";

import useUploadFrames from "../_hooks/use-upload-frames";
import useUploadStickers from "../_hooks/use-upload-stickers";
import { toast } from "sonner";
import MediaUploader from "./media-uploader";
import MediaGallery from "./media-gallery";

export default function SettingsPage({
  frames,
  stickers,
}: {
  frames: Photo[];
  stickers: Photo[];
}) {
  const t = useTranslations("settings");
  console.log(frames, stickers);
  const { UploadFrames, UploadFramesPending } = useUploadFrames();
  const { UploadStickers, UploadStickersPending } = useUploadStickers();

  const uploadFrames = (files: File[]) => {
    if (files.length === 0) return;
    UploadFrames(
      { files },
      {
        onSuccess: () => {
          toast.success("Frames uploaded successfully");
        },
        onError: () => toast.error("Failed to upload frames"),
      }
    );
  };

  const uploadStickers = (files: File[]) => {
    if (files.length === 0) return;
    UploadStickers(
      { files },
      {
        onSuccess: () => {
          toast.success("Stickers uploaded successfully");
        },
        onError: () => toast.error("Failed to upload stickers"),
      }
    );
  };

  return (
    <div className="space-y-10 px-6 xl:px-10 py-5">
      <MediaUploader
        title={t("frames")}
        description={t("framesUploaderDescription")}
        onUpload={uploadFrames}
        isUploading={UploadFramesPending}
        uploadLabel={t("upload")}
      />
      <MediaGallery
        title={t("framesGallery") || t("frames")}
        items={frames}
        emptyText={t("noItems")}
      />

      <MediaUploader
        title={t("stickers")}
        description={t("stickersUploaderDescription")}
        onUpload={uploadStickers}
        isUploading={UploadStickersPending}
        uploadLabel={t("upload")}
      />
      <MediaGallery
        title={t("stickersGallery") || t("stickers")}
        items={stickers}
        emptyText={t("noItems")}
      />
    </div>
  );
}
