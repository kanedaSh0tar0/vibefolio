import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { Document, Page, pdfjs } from "react-pdf";
import Expand from "../../../assets/icons/expand";
import DownloadFile from "../../../assets/icons/download-file";
import { useState } from "react";
import Loader from "../../loader";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
const pdfPath = "/pdf/cv-mykyta-antonov.pdf";

function PDFResume({ modal }: { modal: Modal }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleExpand = () => {
    window.open(pdfPath, "_blank", "noopener noreferrer");
  };

  const handleDownload = async () => {
    fetch(pdfPath).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "cv-mykyta-antonov.pdf";
        alink.click();
      });
    });
  };

  return (
    <Wrapper
      modal={modal}
      buttons={[
        {
          Icon: <Expand />,
          onClick: handleExpand,
          key: "expand",
        },
        {
          Icon: <DownloadFile />,
          onClick: () => setTimeout(handleDownload, 0),
          key: "download",
        },
      ]}
    >
      {isLoading && <Loader />}
      <Document
        onLoadSuccess={() => setIsLoading(false)}
        onLoadError={() => setIsLoading(false)}
        file={pdfPath}
      >
        <Page
          renderTextLayer={false}
          renderAnnotationLayer={false}
          pageNumber={1}
        />
      </Document>
    </Wrapper>
  );
}

export default PDFResume;
