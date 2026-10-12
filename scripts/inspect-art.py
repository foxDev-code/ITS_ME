from html.parser import HTMLParser
from pathlib import Path
import json,sys
sys.stdout.reconfigure(encoding='utf-8')
class Reader(HTMLParser):
    def __init__(self):super().__init__();self.stack=[];self.assets=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('img','svg'):
            self.assets.append({'tag':tag,'src':a.get('src','')[:200],'alt':a.get('alt'),'chain':[x for x in self.stack[-7:]],'class':a.get('class'),'name':a.get('data-framer-name')})
        if tag not in ('img','meta','link','br','input','hr','source'):self.stack.append((tag,a.get('data-framer-name'),a.get('class')))
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i][0]==tag:self.stack=self.stack[:i];break
data={}
for page in ['index.html','work/index.html','about/index.html']:
    r=Reader();r.feed(Path('outputs/portfolio',page).read_text(encoding='utf8'));data[page]=r.assets
Path('work/personalization/original-art.json').write_text(json.dumps(data,indent=2),encoding='utf8')
for page,assets in data.items():
    seen=set();print('\nPAGE',page)
    for a in assets:
        if a['src'] and a['src'] in seen:continue
        seen.add(a['src']);print(json.dumps(a))
