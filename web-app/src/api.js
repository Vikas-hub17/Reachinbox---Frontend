const API_BASE_URL = 'https://api.reachinbox.ai'; // Replace with the actual API base URL

export const fetchOneboxList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/onebox/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Onebox list');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Onebox list:', error);
    return [];
  }
};

export const fetchThread = async (threadId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/onebox/${threadId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch thread with ID ${threadId}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching thread:', error);
    return null;
  }
};

export const deleteThread = async (threadId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/onebox/${threadId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete thread with ID ${threadId}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting thread:', error);
    return null;
  }
};
