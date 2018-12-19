var jsInterface = {
	/**
	 * 数据同步完成
	 * @param data
	 */
	onSyncDone: function(data) {
		angular.element(document.body).injector().get('IM_EVENT').onSyncDone(data);
	},

	receiveMessage: function(data) {
		angular.element(document.body).injector().get('IMMessageService').receiveMessage(data);
	},
	/**
	 * 接收会话列表
	 * @param session
	 */
	receiveSession: function(data) {
		angular.element(document.body).injector().get('IMSessionService').receiveSessionObserver(data);
	}
}