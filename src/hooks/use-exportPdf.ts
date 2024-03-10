// import { useMutation } from "@apollo/client";
// import { ExportPdfInput } from "cv-graphql";
// import { EXPORT_PDF } from "../graphql/exportPdf/exportPdf";

// export const useExportPdf=()=>{
//     return useMutation<bigint, { pdf: ExportPdfInput }>(EXPORT_PDF,
//         {onCompleted(data) {
           
//             const base64String = data;
  
//             const downloadLink = document.createElement("a");
            
//             downloadLink.href =base64String.toString()
            
//             downloadLink.download = "convertedPDFFile.pdf";
            
//             downloadLink.click();
            
//         },}
//     )
// }
