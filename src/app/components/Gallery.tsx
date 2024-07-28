import { useEffect, useState } from "react";
import { listFiles } from "../utils/listFiles";

type Image = {
  id: string;
  version: string;
  createdDate: Date;
};

function buildUrl(data: { key: string }) {
  return `https://srf-polkadot.s3.us-east-2.amazonaws.com/${data.key}`;
}

function renderImages(images: Array<Image>) {
  return images.map((image) => {
    const date = new Intl.DateTimeFormat("us-en", {
      dateStyle: "medium",
    }).format(image.createdDate);
    return (
      <></>
    );
  });
}

export default function () {
  const [images, setImages] = useState<Array<Image>>([]);
  useEffect(() => {
    listFiles()
      .then((data) => {
        return data.resources.map((item) => {
          return {
            id: item["key"],
            version: "",
            createdDate: new Date(item["lastModified"]),
          };
        });
      })
      .then((list: Array<Image>) => {
        const nextImages = list.sort((a, b) => (a.createdDate > b.createdDate ? -1 : 1));
        setImages(nextImages);
      });
  }, []);
  return (
    <div>
      {renderImages(images)}
    </div>
  );
}
