import GalleryContent from "@/components/shared/GalleryContent";
import { getAllPhoto } from "@/lib/actions/gallery.actions";

export default async function Page() {
  const photos = await getAllPhoto();

  return <GalleryContent photos={photos} />;
}
