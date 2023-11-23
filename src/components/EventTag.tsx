import Link from "next/link";

import { ITag } from "@/features/slices/tag/tagInterface";

export default function EventTag({
  tag,
  isClickable = true,
}: {
  tag?: ITag;
  isClickable?: boolean;
}): JSX.Element {
  function renderTag() {
    return (
      <div className="rounded-md text-xs border border-gray-400 hover:border-coventi-500 hover:bg-blue-100 active:bg-blue-200 text-gray-400 hover:text-coventi-500 py-1 mr-2 px-4 mb-2 capitalize">
        {tag?.name}
      </div>
    );
  }

  return (
    <>
      {isClickable ? (
        <Link href={`/tags/${tag?.slug}`}>{renderTag()}</Link>
      ) : (
        renderTag()
      )}
    </>
  );
}
