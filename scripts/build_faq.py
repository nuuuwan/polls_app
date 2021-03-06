import os
import re

from utils import filex, hashx

FAQ_MD_FILE = 'public/faq/FAQ.md'
FAQ_JS_FILE = 'src/nonview/constants/FAQ.js'
REGEX_IMAGE = r'!\[(?P<alt>.*)\]\((?P<src>.*)\)'


def get_faq_list():
    faq_list = []
    current_faq = None
    lines = filex.read(FAQ_MD_FILE).split('\n')
    for line in lines:
        line = line.strip()
        if line[:3] == '## ':
            if current_faq:
                faq_list.append(current_faq)
            current_faq = {
                'question': line[3:],
                'answer_paragraphs': [],
            }
        elif line[:2] == '# ':
            continue
        elif line[:2] == '![':
            d = re.match(REGEX_IMAGE, line).groupdict()
            current_faq['image'] = d['src']
        elif line[:3] == '---':
            if current_faq:
                faq_list.append(current_faq)
            current_faq = {
                'question': "divider",
                'answer_paragraphs': [],
            }
        elif not line:
            continue
        else:
            current_faq['answer_paragraphs'].append(line)

    if current_faq:
        faq_list.append(current_faq)
    return faq_list


def build_js_file(faq_list):
    hash = hashx.md5(str(faq_list))

    lines = []
    lines.append('// Auto-generated by scripts/build_faq.py')
    lines.append(f'// md5(FAQList) = {hash}')
    lines.append('')
    lines.append('export const FAQList = [')

    for faq in faq_list:
        question = faq['question']
        question = question.replace('"', '\\"')

        lines.append('  {')
        lines.append(f'    question: "{question}",')

        answer_paragraphs = faq['answer_paragraphs']
        lines.append('    answerParagraphs: [')
        for answer_paragraph in answer_paragraphs:
            answer_paragraph = answer_paragraph.replace('"', '\\"')
            lines.append(f'      "{answer_paragraph}",')
        lines.append('    ],')

        if 'image' in faq:
            image = faq['image']
            lines.append(f'    image: "{image}",')

        lines.append('  },')

    lines.append('];')

    content = '\n'.join(lines)
    filex.write(
        FAQ_JS_FILE,
        content,
    )
    print(f'Wrote FAQ to {FAQ_JS_FILE}')


def lint():
    for cmd_prefix in [
        'npx prettier --write --loglevel warn',
        'eslint --fix --ext',
    ]:
        os.system(f'{cmd_prefix} {FAQ_JS_FILE}')


if __name__ == '__main__':
    faq_list = get_faq_list()
    build_js_file(faq_list)
    lint()
