// Mock implementation of getUserData and other async functions
const getUserData = (userId, callback) => {
  setTimeout(() => {
    callback(null, { id: userId, name: 'John Doe' });
  }, 1000);
};

const getUserPosts = (userId, callback) => {
  setTimeout(() => {
    callback(null, [{ id: 'post1', title: 'First Post' }]);
  }, 1000);
};

const getCommentsForLatestPost = (postId, callback) => {
  setTimeout(() => {
    callback(null, [{ id: 'comment1', text: 'Great post!' }]);
  }, 1000);
};

const saveUserActivity = (userId, activity, callback) => {
  setTimeout(() => {
    callback(null, { timestamp: new Date().toISOString() });
  }, 1000);
};

const notifyUser = (userId, message, callback) => {
  setTimeout(() => {
    callback(null, { sent: true, timestamp: new Date().toISOString() });
  }, 1000);
};

getUserData("user123", (error, user) => {
  if (error) {
    console.error("Error fetching user:", error);
    return;
  }

  getUserPosts(user.id, (error, posts) => {
    if (error) {
      console.error("Error fetching posts:", error);
      return;
    }

    getCommentsForLatestPost(posts[0].id, (error, comments) => {
      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }

      saveUserActivity(user.id, "read_comments", (error, activityLog) => {
        if (error) {
          console.error("Error saving activity:", error);
          return;
        }

        notifyUser(
          user.id,
          "New comments on your post",
          (error, notification) => {
            if (error) {
              console.error("Error sending notification:", error);
              return;
            }

            console.log("Process completed successfully!");
            console.log("User:", user.name);
            console.log("Latest post:", posts[0].title);
            console.log("Comments:", comments.length);
            console.log("Activity logged:", activityLog.timestamp);
            console.log("Notification sent:", notification.sent);
          }
        );
      });
    });
  });
});

// Flattened callbacks using named functions
const processUserDataFlattened = (userId) => {
  getUserData(userId, handleUserData);
};

const handleUserData = (error, user) => {
  if (error) {
    console.error('Error fetching user:', error);
    return;
  }
  
  const userData = user;
  console.log('User fetched:', userData.name);
  
  getUserPosts(userData.id, (error, posts) => handleUserPosts(error, posts, userData));
};

const handleUserPosts = (error, posts, userData) => {
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  
  console.log('Posts fetched:', posts.length);
  
  const latestPost = posts[0];
  getCommentsForLatestPost(latestPost.id, (error, comments) => 
    handlePostComments(error, comments, userData, latestPost));
};

const handlePostComments = (error, comments, userData, latestPost) => {
  if (error) {
    console.error('Error fetching comments:', error);
    return;
  }
  
  console.log('Comments fetched:', comments.length);
  
  saveUserActivity(userData.id, 'read_comments', (error, activityLog) => 
    handleActivitySaved(error, activityLog, userData, latestPost, comments));
};

const handleActivitySaved = (error, activityLog, userData, latestPost, comments) => {
  if (error) {
    console.error('Error saving activity:', error);
    return;
  }
  
  console.log('Activity saved:', activityLog.timestamp);
  
  notifyUser(userData.id, 'New comments on your post', (error, notification) => 
    handleNotification(error, notification, userData, latestPost, comments, activityLog));
};

const handleNotification = (error, notification, userData, latestPost, comments, activityLog) => {
  if (error) {
    console.error('Error sending notification:', error);
    return;
  }
  
  console.log('Process completed successfully!');
  console.log('User:', userData.name);
  console.log('Latest post:', latestPost.title);
  console.log('Comments:', comments.length);
  console.log('Activity logged:', activityLog.timestamp);
  console.log('Notification sent:', notification.sent);
};

// Promise-based implementation
const getUserDataPromise = (userId) => {
  return new Promise((resolve, reject) => {
    getUserData(userId, (error, user) => {
      if (error) reject(error);
      else resolve(user);
    });
  });
};

const getUserPostsPromise = (userId) => {
  return new Promise((resolve, reject) => {
    getUserPosts(userId, (error, posts) => {
      if (error) reject(error);
      else resolve(posts);
    });
  });
};

const getCommentsForLatestPostPromise = (postId) => {
  return new Promise((resolve, reject) => {
    getCommentsForLatestPost(postId, (error, comments) => {
      if (error) reject(error);
      else resolve(comments);
    });
  });
};

const saveUserActivityPromise = (userId, activity) => {
  return new Promise((resolve, reject) => {
    saveUserActivity(userId, activity, (error, activityLog) => {
      if (error) reject(error);
      else resolve(activityLog);
    });
  });
};

const notifyUserPromise = (userId, message) => {
  return new Promise((resolve, reject) => {
    notifyUser(userId, message, (error, notification) => {
      if (error) reject(error);
      else resolve(notification);
    });
  });
};

const processUserDataWithPromises = async (userId) => {
  try {
    const user = await getUserDataPromise(userId);
    const posts = await getUserPostsPromise(user.id);
    const comments = await getCommentsForLatestPostPromise(posts[0].id);
    const activityLog = await saveUserActivityPromise(user.id, 'read_comments');
    const notification = await notifyUserPromise(user.id, 'New comments on your post');

    return {
      user,
      latestPost: posts[0],
      comments,
      activityLog,
      notification
    };
  } catch (error) {
    throw error;
  }
};

// Test the initial callback hell implementation
console.log('Testing callback hell implementation:');
getUserData('user123', handleUserData);

// After implementing refactored solutions:
console.log('\nTesting flattened callbacks implementation:');
processUserDataFlattened('user123');

console.log('\nTesting Promises implementation:');
processUserDataWithPromises('user123')
  .then(result => console.log('Process completed successfully!', result))
  .catch(error => console.error('Error in process:', error));

console.log('\nTesting async/await implementation:');

processUserDataWithPromises('user123')
  .then(result => console.log('Process completed successfully!', result))
  .catch(error => console.error('Error in process:', error));