from scholarly import scholarly
import json

# Your Google Scholar ID (find this in the URL of your profile)
AUTHOR_ID = 'LplLb9EAAAAJ'

def fetch_publications():
    author = scholarly.search_author_id(AUTHOR_ID)
    scholarly.fill(author)
    return author['publications']

def generate_html(pubs):
    # This reads your existing template and injects the pubs
    template = open('index.html.template', 'r').read()
    
    pub_html = ""
    for pub in pubs:
        title = pub['bib']['title']
        year = pub['bib'].get('pub_year', 'N/A')
        link = pub.get('pub_url', '#')
        pub_html += f"<li><strong>{year}</strong>: <a href='{link}'>{title}</a></li>"
    
    return template.replace('{{PUBLICATIONS}}', pub_html)

# Run the update
pubs = fetch_publications()
with open('index.html', 'w') as f:
    f.write(generate_html(pubs))
