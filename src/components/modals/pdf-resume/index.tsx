import { Modal } from "../../../store/modalSlice";
import Wrapper from "../wrapper";
import { Document, Page, pdfjs } from "react-pdf";
import Expand from "../../../assets/icons/expand";
import DownloadFile from "../../../assets/icons/download-file";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
const pdfPath = "/pdf/cv-mykyta-antonov.pdf";

function PDFResume({ modal }: { modal: Modal }) {
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
      <Document
        onLoadSuccess={({ numPages }) =>
          console.log("PDF loaded. Pages:", numPages)
        }
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
