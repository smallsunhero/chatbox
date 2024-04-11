<template>
  <div class="chat-container">
    <div class="conversation-list">
      <ul>
        <li
            v-for="conversation in conversations"
            :key="conversation.id"
            @click="selectConversation(conversation)"
            :class="{ 'active': selectedConversation === conversation }"
        >
          {{ conversation.name }}
        </li>
      </ul>
    </div>
    <div class="chat-box">
      <div class="messages">
        <div
            v-for="(message, index) in selectedConversation.messages"
            :key="index"
            class="message"
            :class="{ 'user-message': message.type === 'user', 'bot-message': message.type === 'bot' }"
        >
          {{ message.content }}
        </div>
      </div>
      <div class="input-container">
        <input
            type="text"
            v-model="newMessage"
            @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../utils/request";
export default {
  data() {
    return {
      newMessage: '',
      conversations: [
        {
          id: 1,
          name: '对话1',
          messages: []
        },
        {
          id: 2,
          name: '对话2',
          messages: []
        },
        {
          id: 3,
          name: '对话3',
          messages: []
        },  {
          id: 4,
          name: '对话4',
          messages: []
        },
        {
          id: 5,
          name: '对话5',
          messages: []
        },  {
          id: 6,
          name: '对话6',
          messages: []
        },  {
          id: 7,
          name: '对话7',
          messages: []
        },
        // 更多对话...
      ],
      selectedConversation: null,
    };
  },
  created() {
    this.loadMessages();
    // 初始化时选择第一个对话
    this.selectedConversation = this.conversations[0];
  },
  methods: {
    selectConversation(conversation) {
      this.selectedConversation = conversation;
      this.saveMessages(); // 当选择不同的对话时保存消息
    },
    async sendMessage() {
      if (this.newMessage.trim() === '') return;
      const userMessage = {
        content: this.newMessage,
        type: 'user'
      };
      this.selectedConversation.messages.push(userMessage);
      this.newMessage = '';
      this.saveMessages(); // 保存消息

      try {
        const response = await request.post('/get_response', {
          text: userMessage.content
        });
        const botMessage = {
          content: response.data,
          type: 'bot'
        };
        console.log(response)
        this.selectedConversation.messages.push(botMessage);
        this.saveMessages();
      } catch (error) {
        console.error('从服务器获取响应时出错:', error);
      }

      // 模拟发送请求到后端并接收响应
      //this.fetchAnswer(userMessage.content);
    },
    fetchAnswer(question) {
      // 这里应该是调用后端接口的代码，我们暂时使用 setTimeout 来模拟
      setTimeout(() => {
        const botMessage = {
          content: '这是后端返回的答案，用于回答问题: ' + question,
          type: 'bot'
        };
        this.selectedConversation.messages.push(botMessage);
        this.saveMessages();
      }, 1000); // 模拟后端延迟1秒返回答案
    },
    saveMessages() {
      localStorage.setItem('conversations', JSON.stringify(this.conversations));
    },
    loadMessages() {
      const savedConversations = localStorage.getItem('conversations');
      if (savedConversations) {
        this.conversations = JSON.parse(savedConversations);
      }
    },
  }
};
</script>

<style scoped>
.container {
  background-image: url('photo/photo2JPEG.webp'); /* 设置背景图片路径 */
  background-repeat: no-repeat; /* 背景不重复 */
  background-position: center; /* 背景图片居中 */
  background-size: cover; /* 背景图片覆盖整个容器 */
}
body,html {
  height: 100%; /* 设置 body 和 html 的高度为 100% */
  margin: 0; /* 清除默认边距 */
  display: flex; /* 使用 flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #f9f9f9; /* 设置一个背景颜色，以便于查看中心对齐效果 */
}

.chat-container {
  display: flex;
  height: 75vh;
  max-width: 800px; /* 设置最大宽度为 640px，即原来宽度的一半 */
  margin: 0 auto; /* 居中显示 */
  margin-top: 100px; /* 顶部下移50像素 */

}

.conversation-list {
  min-width: 125px;
  border: 10px solid #fff; /* 上下左右都添加1像素宽的白色边框 */
  padding: 10px;
  overflow-y: auto;
  //background-color: #f9f9f9; /* 轻微的颜色区分 */
  background-image: url('photo/photo4.jpg');
  background-repeat: no-repeat; /* 或者其他你想要的重复方式，比如 no-repeat */
  background-position: center; /* 或者你想要的背景位置 */
  background-size: cover; /* 或者其他你想要的背景大小 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width:1280px;
}

.conversation-list ul {
  list-style: none;
  padding: 0;
}

.conversation-list li {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f1f1f1;
  transition: background-color 0.3s; /* 过渡效果 */
}

.conversation-list li.active {
  background-color: #e9e9e9;
}

.chat-box {
  flex-grow: 1;
  background-color: #ffffff;
  border-left: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width:1280px;
}

.messages {
  height: 470px;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
  background-image: url('photo/photo3.jpg');
  background-repeat: no-repeat; /* 或者其他你想要的重复方式，比如 no-repeat */
  background-position: center; /* 或者你想要的背景位置 */
  background-size: cover; /* 或者其他你想要的背景大小 */

}

.message {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
  border-radius: 8px;
  padding: 8px 12px;
  margin: 4px 0;
  clear: both;
  word-break: break-all; /* 防止单词过长 */
}

.user-message {
  background-color: #DCF8C5;
  float: right;
  margin-left: 60px;
}

.bot-message {
  background-color: #f1f1f1;
  float: left;
  margin-right: 60px;
}

.input-container {
  display: flex;
  padding: 8px;
  background-color: #f9f9f9;
  border-top: 1px solid #ccc;
  margin-top: auto; /* 将输入框和发送按钮推到底部 */
  background-image: url('photo/photo1JPEG.webp');
  background-repeat: no-repeat; /* 或者其他你想要的重复方式，比如 no-repeat */
  background-position: center; /* 或者你想要的背景位置 */
  background-size: cover; /* 或者其他你想要的背景大小 */

}

input {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 4px;
  flex-grow: 1; /* 输入框占满剩余空间 */
  margin-right: 8px;
  font-size: 16px;
  width:100%;
  word-wrap: break-word; /* 允许长单词或 URL 地址换行 */
  overflow-wrap: break-word; /* 同上，为了更好的兼容性 */
  font-size: 16px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s; /* 过渡效果 */
}

button:hover {
  background-color: #2c9f7f;
}

.messages::-webkit-scrollbar {
  width: 6px;
}

.messages::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.messages::-webkit-scrollbar-thumb {
  background: #888;
}

.messages::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.message-enter-active {
  animation: slide-in 0.5s ease;
}

@keyframes slide-in {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
