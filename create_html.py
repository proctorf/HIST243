#!/usr/bin/env python3

import markdown
from pathlib import Path

def markdown_to_html(md_file, html_file):
    """Convert markdown file to HTML"""
    
    # Read the markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(md_content, extensions=['toc', 'tables'])
    
    # Add CSS styling for print-friendly PDF conversion
    css_style = """
    <style>
    @media print {
        body { margin: 1in; }
        h1 { page-break-before: always; }
        h1:first-child { page-break-before: avoid; }
    }
    body {
        font-family: Times, "Times New Roman", serif;
        font-size: 11pt;
        line-height: 1.6;
        max-width: none;
        margin: 1in auto;
        color: #333;
        background: white;
    }
    h1, h2, h3, h4, h5, h6 {
        color: #000;
        page-break-after: avoid;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
    }
    h1 {
        font-size: 18pt;
        border-bottom: 2px solid #333;
        padding-bottom: 10px;
        margin-top: 0;
    }
    h2 {
        font-size: 16pt;
        margin-top: 1.5em;
    }
    h3 {
        font-size: 14pt;
    }
    h4 {
        font-size: 12pt;
        font-weight: bold;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 15px 0;
        page-break-inside: avoid;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }
    p {
        margin-bottom: 1em;
        text-align: justify;
    }
    ul, ol {
        margin-bottom: 1em;
        padding-left: 2em;
    }
    li {
        margin-bottom: 0.25em;
    }
    .page-break {
        page-break-before: always;
    }
    /* Remove any links styling for PDF */
    a {
        color: #333;
        text-decoration: none;
    }
    </style>
    """
    
    # Combine CSS and HTML
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HIST243-01-S26 Course Materials</title>
    {css_style}
</head>
<body>
{html_content}
</body>
</html>"""
    
    # Write the HTML file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(full_html)
    
    print(f"Successfully created HTML file: {html_file}")
    print("You can now open this file in your browser and use 'Print to PDF' to create the PDF.")

if __name__ == "__main__":
    md_file = "HIST243-01-S26.md"
    html_file = "HIST243-01-S26.html"
    
    if Path(md_file).exists():
        markdown_to_html(md_file, html_file)
    else:
        print(f"Markdown file not found: {md_file}")