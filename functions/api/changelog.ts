interface Env {
  GITHUB_TOKEN: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
}

export const onRequest: PagesFunction<Env> = async context => {
  const { GITHUB_TOKEN } = context.env;

  const headers = new Headers({
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'leafer-htmltext-edit-website'
  });

  if (GITHUB_TOKEN) {
    headers.set('Authorization', `Bearer ${GITHUB_TOKEN}`);
  }

  const response = await fetch(
    'https://api.github.com/repos/chenyomi/npm-chenyomi-leafer-htmltext-edit/commits?per_page=30',
    { headers }
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch commits' }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const commits: GitHubCommit[] = await response.json();

  // 只返回 feat/fix 类型的提交，过滤无意义的"更新"提交
  const changelog = commits
    .map(c => ({
      sha: c.sha.slice(0, 7),
      date: c.commit.author.date.slice(0, 10),
      message: c.commit.message.split('\n')[0],
      detail: c.commit.message
        .split('\n')
        .slice(1)
        .map(l => l.trim())
        .filter(l => l.startsWith('-'))
    }))
    .filter(c => /^(feat|fix|refactor|perf)/i.test(c.message));

  return new Response(JSON.stringify(changelog), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
