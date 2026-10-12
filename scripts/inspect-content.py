from html.parser import HTMLParser
from pathlib import Path
import json
class Reader(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip=0; self.text=[]
    def handle_starttag(self,tag,attrs):
        if tag in ('script','style'): self.skip+=1
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.skip=max(0,self.skip-1)
    def handle_data(self,data):
        if not self.skip and data.strip(): self.text.append(data.strip())
data={}
for p in Path('work/source-cache').rglob('index.html'):
    r=Reader();r.feed(p.read_text(encoding='utf8'));data[str(p.relative_to('work/source-cache'))]=list(dict.fromkeys(r.text))
Path('work/personalization').mkdir(parents=True,exist_ok=True)
Path('work/personalization/original-text.json').write_text(json.dumps(data,indent=2,ensure_ascii=False),encoding='utf8')
print(json.dumps(data,indent=2,ensure_ascii=False))
