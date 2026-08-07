import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export function exportToPdf(filename = "report.pdf", columns = [], rows = [], options = {}) {
  const doc = new jsPDF("p", "pt");
  const title = options.title || "Report";
  const generatedAt = options.generatedAt || new Date().toLocaleString();
  const generatedFrom = options.generatedFrom || (typeof window !== "undefined" ? window.location.href : "");

  doc.setFontSize(14);
  doc.text(title, 40, 50);
  doc.setFontSize(10);
  doc.text(`Generated: ${generatedAt}`, 40, 68);
  doc.text(`Source: ${generatedFrom}`, 40, 84);

  autoTable(doc, {
    startY: 100,
    head: [columns.map((c) => c.label || c.key)],
    body: rows.map((r) => columns.map((c) => (c.render ? stripHtml(String(c.render(r))) : stripHtml(String(r[c.key] ?? ""))))),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [163, 22, 33] },
  });

  doc.save(filename);
}

export function exportToExcel(filename = "report.xlsx", columns = [], rows = [], options = {}) {
  const generatedAt = options.generatedAt || new Date().toLocaleString();
  const generatedFrom = options.generatedFrom || (typeof window !== "undefined" ? window.location.href : "");

  const header = columns.map((c) => c.label || c.key);
  const data = rows.map((r) => columns.map((c) => (c.render ? stripHtml(String(c.render(r))) : String(r[c.key] ?? ""))));

  // Prepend metadata rows for professional report
  const sheetData = [
    [options.title || "Report"],
    [`Generated: ${generatedAt}`],
    [`Source: ${generatedFrom}`],
    [],
    header,
    ...data,
  ];

  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, options.sheetName || "Report");
  XLSX.writeFile(wb, filename);
}

export function exportToCsv(filename = "report.csv", columns = [], rows = []) {
  const header = columns.map((c) => c.label || c.key).join(",");
  const body = rows.map((r) => columns.map((c) => (c.render ? stripHtml(String(c.render(r))) : String(r[c.key] ?? ""))).join(",") ).join("\n");
  const csv = [header, body].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function stripHtml(value) {
  if (typeof value !== "string") return value;
  return value.replace(/<[^>]*>/g, "");
}
