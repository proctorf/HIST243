#!/usr/bin/env python3

import markdown
import pdfkit
from pathlib import Path
import sys

def markdown_to_pdf(md_file, pdf_file):
    """Convert markdown file to PDF"""
    
    # Read the markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html = markdown.markdown(md_content, extensions=['toc', 'tables'])
    
    # Add CSS styling
    css_style = """
    <style>
    body {
        font-family: Times, serif;
        font-size: 11pt;
        line-height: 1.5;
        max-width: 8.5in;
        margin: 1in;
        color: #333;
    }
    h1, h2, h3, h4, h5, h6 {
        color: #000;
        page-break-after: avoid;
    }
    h1 {
        font-size: 18pt;
        border-bottom: 2px solid #333;
        padding-bottom: 10px;
    }
    h2 {
        font-size: 16pt;
        margin-top: 20px;
    }
    h3 {
        font-size: 14pt;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 10px 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
    .page-break {
        page-break-before: always;
    }
    </style>
    """
    
    # Combine CSS and HTML
    full_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        {css_style}
    </head>
    <body>
        {html}
    </body>
    </html>
    """
    
    # PDF options
    options = {
        'page-size': 'Letter',
        'margin-top': '1in',
        'margin-right': '1in',
        'margin-bottom': '1in',
        'margin-left': '1in',
        'encoding': "UTF-8",
        'no-outline': None
    }
    
    try:
        # Convert HTML to PDF
        pdfkit.from_string(full_html, pdf_file, options=options)
        print(f"Successfully created PDF: {pdf_file}")
        return True
    except Exception as e:
        print(f"Error creating PDF: {e}")
        return False

if __name__ == "__main__":
    md_file = "HIST243-01-S26.md"
    pdf_file = "HIST243-01-S26.pdf"
    
    if Path(md_file).exists():
        success = markdown_to_pdf(md_file, pdf_file)
        if success:
            print(f"PDF created successfully: {pdf_file}")
        else:
            print("Failed to create PDF")
    else:
        print(f"Markdown file not found: {md_file}")