export const getStarsCount = async (): Promise<number> => {
  try {
    const response = await fetch(`https://api.github.com/repos/chenyomi/leafer-htmltext-edit-view`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data.stargazers_count || 0;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    throw error;
  }
};

/**
 * Decodes a label from kebab-case to title case
 * @param label - The label to decode (e.g., "split-text")
 * @returns The decoded label (e.g., "Split Text")
 */
export const decodeLabel = (label: string): string => {
  if (!label) return '';

  return label
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Custom styles for PrimeVue Toast component
 */
export const customToastStyles = {
  message: {
    style: {
      borderRadius: '10px',
      border: '1px solid #333',
      backgroundColor: '#0b0b0b'
    }
  },
  messageContent: {
    style: {
      alignItems: 'center'
    }
  },
  messageIcon: {
    style: {
      display: 'none'
    }
  },
  customToastCloseButton: { style: { right: '0', margin: '0', outline: 'none', border: 'none' } }
};
