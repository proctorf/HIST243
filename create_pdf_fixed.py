#!/usr/bin/env python3

import subprocess
import os
import time
import sys

def create_pdf_with_safari():
    """Try to create PDF using Safari via AppleScript"""
    html_file = os.path.abspath("HIST243-01-S26-corrected.html")
    pdf_file = os.path.abspath("HIST243-01-S26.pdf")
    
    # Create AppleScript to open HTML in Safari and print to PDF
    applescript = f'''
    tell application "Safari"
        activate
        set newTab to make new document with properties {{URL:"file://{html_file}"}}
        delay 3
        tell newTab
            print with properties {{target printer:"Save as PDF", copies:1}} without print dialog
        end tell
        delay 2
        close newTab
    end tell
    '''
    
    try:
        # Run the AppleScript
        result = subprocess.run(['osascript', '-e', applescript], 
                              capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            print("PDF creation initiated via Safari")
            return True
        else:
            print(f"Safari method failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"Safari method error: {e}")
        return False

def create_pdf_simple():
    """Create a simple text-based PDF using system tools"""
    html_file = "HIST243-01-S26-corrected.html"
    pdf_file = "HIST243-01-S26.pdf"
    
    try:
        # Try using textutil to convert to RTF first, then to PDF
        rtf_file = "HIST243-01-S26.rtf"
        
        # Convert HTML to RTF
        result1 = subprocess.run(['textutil', '-convert', 'rtf', html_file, '-output', rtf_file], 
                                capture_output=True, text=True)
        
        if result1.returncode == 0:
            # Convert RTF to PDF
            result2 = subprocess.run(['textutil', '-convert', 'pdf', rtf_file, '-output', pdf_file], 
                                   capture_output=True, text=True)
            
            if result2.returncode == 0:
                print(f"Successfully created PDF: {pdf_file}")
                # Clean up RTF file
                os.remove(rtf_file)
                return True
            else:
                print(f"RTF to PDF conversion failed: {result2.stderr}")
                return False
        else:
            print(f"HTML to RTF conversion failed: {result1.stderr}")
            return False
            
    except Exception as e:
        print(f"Error in simple PDF creation: {e}")
        return False

def main():
    print("Creating PDF from HTML file...")
    
    # Check if HTML file exists
    if not os.path.exists("HIST243-01-S26-corrected.html"):
        print("Error: HTML file not found")
        return False
    
    # Try simple method first
    if create_pdf_simple():
        return True
    
    # Fall back to Safari method
    print("Trying Safari method...")
    if create_pdf_with_safari():
        print("Please check your Desktop or Documents folder for the PDF")
        return True
    
    print("PDF creation failed. Please use your browser to open the HTML file and print to PDF manually.")
    return False

if __name__ == "__main__":
    main()