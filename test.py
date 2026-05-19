
try:
    import fitz # PyMuPDF
    doc = fitz.open(r'c:\Users\abhi7\OneDrive\Documents\Projects\Portfolio\Abhishek_Agrawal_Resume.pdf')
    for page in doc:
        for link in page.get_links():
            print('URI:', link.get('uri'))
            
except ImportError:
    try:
        from PyPDF2 import PdfReader
        reader = PdfReader(r'c:\Users\abhi7\OneDrive\Documents\Projects\Portfolio\Abhishek_Agrawal_Resume.pdf')
        for page in reader.pages:
            if '/Annots' in page:
                for annot in page['/Annots']:
                    annot_obj = annot.get_object()
                    if annot_obj.get('/Subtype') == '/Link':
                        if '/A' in annot_obj and '/URI' in annot_obj['/A']:
                            print('URI:', annot_obj['/A']['/URI'])
    except Exception as e:
        print('Error:', e)
