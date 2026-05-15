import fs from 'fs';
import path from 'path';
import https from 'https';

const REPOS = [
    {
        name: 'leafer-htmltext-edit',
        url: 'https://raw.githubusercontent.com/chenyomi/leafer-htmltext-edit/main/README.md',
        savePath: 'src/content/docs/leafer-htmltext-edit.md'
    },
    {
        name: 'leafer-htmltext-edit-view',
        url: 'https://raw.githubusercontent.com/chenyomi/leafer-htmltext-edit-view/master/README.md',
        savePath: 'src/content/docs/leafer-htmltext-edit-view.md'
    }
];

function fetchRaw(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { 
            timeout: 15000,
            headers: { 'User-Agent': 'Node.js/HTTPS-Client' }
        }, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                https.get(res.headers.location, { headers: { 'User-Agent': 'Node.js' } }, (res2) => {
                    let data = '';
                    res2.on('data', chunk => data += chunk);
                    res2.on('end', () => resolve(data));
                }).on('error', reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Status Code: ${res.statusCode}`));
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    });
}

function convertMarkdownToVue(name, content) {
    // 简单的 Markdown 转 Vue 内容，可以根据需要使用 markdown-it 或其他库
    // 这里为了演示，我们只将其包裹在 template 中，或者你可以直接在页面中动态加载 md
    return content;
}

async function main() {
    const docsDir = path.resolve('src/content/docs');
    if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

    for (const config of REPOS) {
        console.log(`Fetching ${config.name}...`);
        
        // 尝试多个可能的 URL
        const urlsToTry = [config.url];
        if (config.url.includes('/main/')) urlsToTry.push(config.url.replace('/main/', '/master/'));
        if (config.url.includes('/master/')) urlsToTry.push(config.url.replace('/master/', '/main/'));
        
        // 附加特殊路径
        if (config.name === 'leafer-htmltext-edit') {
            urlsToTry.push('https://raw.githubusercontent.com/chenyomi/npm-chenyomi-leafer-htmltext-edit/main/README.md');
            urlsToTry.push('https://raw.githubusercontent.com/chenyomi/npm-chenyomi-leafer-htmltext-edit/master/README.md');
        }

        let success = false;
        let fetchedContent = '';
        for (const url of urlsToTry) {
            try {
                fetchedContent = await fetchRaw(url);
                success = true;
                break;
            } catch (e) { }
        }

        if (success) {
            fs.writeFileSync(path.resolve(config.savePath), fetchedContent);
            console.log(`Saved ${config.name}`);
        } else {
            console.error(`Failed to fetch ${config.name}`);
        }
    }
}

main();
