$(function () {
  let clipboard
  let awardConfigList = []
  const business = {
    init: function () {
      Mover.init();
      this.initClipboard()
      this.bindEvent();
      this.getRewardConfig();

      if (Mover.getIsLogin()) {
        Mover.rolePopupWhenIsLoginButNotSelectedRole();
        $(".btn-login").hide();
        $(".user-tips").hide();
        $(".btn-logout").show();
      }
      if (Mover.getIsSelectedRole()) {
        business.selectedRoleCallback();
      }
    },
    initClipboard() {
      if (!ClipboardJS) return
      clipboard = new ClipboardJS('.btn-copy');
    },
    copySerial() {
      clipboard.on('success', function (e) {
        MoverRamda.msgPopup('禮品碼已成功複製，請到遊戲內兌換')
      });

      clipboard.on('error', function (e) {
        MoverRamda.msgPopup('很抱歉，您的設備暫時不支持複製功能，請自行選中禮包碼進行複製！')
      });
    },
    bindEvent: function () {
      $(".pop-record").on('click', '.btn-copy', function () {
        business.copySerial()
      })
      $(".btn-record").click(function () {
        if (Mover.getIsLogin()) {
          business.getRecord();
        } else {
          Mover.login();
        }
      });
      $(".btn-login").click(function () {
        Mover.login();
      });
      $(".btn-logout").click(function () {
        Mover.logout();
      });

      $(".btn-confirm").click(function () {
        business.getReward(currentRewardInfo);
      });
      $(".select-box-group").click(function () {
        setTimeout(function () {
          if (Mover.getIsSelectedRole()) {
            business.selectedRoleCallback();
          }
        });
      });
    },
    bindBtnReceiveEvent() {
      $(".btn-receive").click(function () {
        if (!Mover.getIsLogin()) {
          Mover.login();
          return;
        }
        if (!Mover.getIsSelectedRole()) {
          Mover.rolePopupWhenIsLoginButNotSelectedRole();
          return;
        }
        const currentRewardInfo = business.initCurrentRewardInfo(this);
        // 多游戏时需判断当前领取游戏是否为当前选中的服角的游戏
        const currentLoginGame = MoverRamda.Cookies.get("selectedGameCode");
        if (
          Mover.selectGames.length > 1 &&
          currentRewardInfo.rewardGameCode !== currentLoginGame
        ) {
          MoverRamda.msgPopup(
            `當前登錄帳號選擇的游戲為: ${MoverRamda.Cookies.get(
              "selectedGameName"
            )}<br>如不想領取此遊戲的獎勵，請登出賬號並重新登錄`
          );
          return;
        }
        $(".pop-confirm-reward").bPopup();
        // business.getRemainTimes();
      });
    },

    selectedRoleCallback: function () {
      const userBox = $(".user-box .user");
      userBox.html(
        "角色:" + decodeURIComponent(MoverRamda.Cookies.get("selectedRoleName"))
      );
      userBox.show();
    },

    /**
     * @description: 初始化当前奖励信息
     * @param {*} self
     * @return {*}
     */
    initCurrentRewardInfo: function (self) {
      currentRewardInfo.receiveGameCodeIndex = 0;

      if (Mover.selectGames.length > 1) {
        const currentTableDom = $(self).parents(".table-game-list");
        $(".table-game-list").each(function (index, item) {
          if (currentTableDom[0] === item) {
            currentRewardInfo.receiveGameCodeIndex = index;
          }
        });
      }

      let selectedServerName = MoverRamda.Cookies.get("selectedServerName");
      let selectedRoleName = MoverRamda.Cookies.get("selectedRoleName");
      const rewardCode = $(self).attr('data-rewardcode')

      currentRewardInfo.rewardCode = rewardCode;
      currentRewardInfo.rewardGameCode =
        Mover.selectGames[currentRewardInfo.receiveGameCodeIndex].gameCode;
      // currentRewardInfo.activityType =
      //   Mover.selectGames[currentRewardInfo.receiveGameCodeIndex]
      //   .activityType || currentRewardInfo.defaultActivityType;
      currentRewardInfo.activityType = awardConfigList.find(item => item.rewardCode === rewardCode).sonType || ''
      currentRewardInfo.successRewardTips =
        Mover.selectGames[currentRewardInfo.receiveGameCodeIndex]
        .successRewardTips || currentRewardInfo.defaultSuccessRewardTips;

      const giftContent = $(self).parent().prev().html()
      const rewardTips = {
        '抽奖后发序列号': '請查收禮品碼至遊戲內兌換',
        default: `將發送到遊戲UID：${selectedServerName}-${selectedRoleName}的郵箱中`
      }
      console.log("🚀 ~ file: business-v4.js ~ line 144 ~ currentRewardInfo.activityType", currentRewardInfo.activityType)

      $(".pop-confirm-reward p")
        .first()
        .html('獲得"' + giftContent + '"');
      $(".pop-confirm-reward p")
        .first()
        .next()
        .html(
          rewardTips[currentRewardInfo.activityType] || rewardTips.default
        );
      return currentRewardInfo;
    },
    /**
     * @description: 获取奖励配置
     */
    getRewardConfig: function () {
      Mover.$API(
        Mover.activityAPIPrefix + 'common/public/getRewardConfig', {
          activityCode: Mover.activityCode,
          platform: Mover.platform,
          language: Mover.language,
          isNeedGetParentAndSon: true
        }
      ).done(function (res) {
        const {
          code,
          data
        } = res[0];
        if (code === "1000") {
          const {
            rewardConfig
          } = data

          if (rewardConfig.length) {
            const tableArr = $('.table-box table')
            rewardConfig.map((list, index) => {
              const tableItem = $(tableArr[index])
              const str = business.renderRewardConfig(list.sonReward)
              tableItem.html(str)
            })
          }
        }
        business.bindBtnReceiveEvent();
      });
    },
    /**
     * @description: 获取领奖次数
     * @param {*} currentRewardInfo 当前奖励信息
     */
    getRemainTimes: function (currentRewardInfo) {
      const params = {
        getRewardGame: currentRewardInfo.rewardGameCode,
        rewardCode: currentRewardInfo.rewardCode,
      };
      Mover.$API(
        Mover.activityAPIPrefix + "mycardGash_getRemainTimes",
        params
      ).done(function (data) {
        var {
          code,
          remainTimes,
          message
        } = data[0];
        if (code === "1000") {
          remainTimes > 0 ?
            $(".pop-confirm-reward").bPopup() :
            MoverRamda.msgPopup("次數不足");
        } else if (code === "1033") {
          //   cookie超时
          MoverRamda.msgPopup(message);
          setTimeout(function () {
            Mover.login();
          }, 1000).bind(this);
        } else if (["1018", "1019"].includes(code)) {
          //   活动还没开始
          MoverRamda.msgPopup(message);
        } else {
          remainTimes > 0 ?
            $(".pop-confirm-reward").bPopup() :
            MoverRamda.msgPopup("次數不足");
        }
      });
    },
    /**
     * @description: 领奖
     * @param {*} currentRewardInfo 当前奖励信息
     */
    getReward: function (currentRewardInfo) {
      var params = {
        rewardGameCode: currentRewardInfo.rewardGameCode,
        rewardCode: currentRewardInfo.rewardCode
      };
      Mover.$API(Mover.activityAPIPrefix + 'common/public/getReward', params).done(
        function (data) {
          const {
            code,
            message
          } = data[0];
          if (code === "1000") {
            if (currentRewardInfo.successRewardTips) {
              const result = business.getRewardContentByRewardCode(currentRewardInfo.rewardCode)
              MoverRamda.msgPopup(currentRewardInfo.successRewardTips.replace('XX', result || ''));
              return;
            }
            $(".pop-success").bPopup();
          } else {
            MoverRamda.msgPopup(message);
          }
        }
      );
    },
    /**
     * @description: 获取领奖记录
     */
    getRecord: function () {
      Mover.$API(
        Mover.activityAPIPrefix + 'common/public/getRewardInfo', {
          platform: Mover.platform,
          language: Mover.language
        }
      ).done(function (res) {
        const {
          code,
          data,
          message
        } = res[0];
        if (code === "1000") {
          const {
            rewardRecordList
          } = data
          if (rewardRecordList.length) {
            const str = business.renderRewardRecord(rewardRecordList);
            $(".record-box").html(str)
          } else {
            business.renderNullRecord()
          }
          $(".pop-record").bPopup();
        } else {
          MoverRamda.msgPopup(message);
        }
      });
    },
    getIsSerialGift() {
      return currentRewardInfo.activityType === 'type1' || currentRewardInfo.defaultActivityType === 'type1'
    },
    /**
     * @description: 根据rewardCode获取
     * @param {*} rewardCode
     * @return {*}
     */
    getRewardContentByRewardCode: function (rewardCode) {
      return awardConfigList.find(item => item.rewardCode === rewardCode).rewardTitle
    },
    renderNullRecord() {
      $(".record-box").html("<p style='text-align:center;padding: 0.32rem;font-size: .3rem;'>暫無記錄<p/>");
    },
    /**
     * @description: 渲染奖励记录列表
     * @param {*} recordList
     * @return {*}
     */
    renderRewardRecord: function (recordList) {
      let str = `<table><thead><tr>
                    <th width="30%">時間</th>
                    <th width="40%">獎勵內容</th>
                    <th width="30%">備註</th>
                </tr></thead><tbody>`;
      if (recordList.length > 0) {
        recordList.map(({
          time,
          rewardType,
          content,
          title
        }) => {
          if (rewardType !== '抽奖后发序列号') {
            str +=
              `<tr class="record">
                <td width="30%">${time}</td>
                <td width="40%">${title}</td>
                <td width="30%">已發送到郵箱中</td>
              </tr>`;
          } else {
            str +=
              `<tr class="record">
              <td width="30%">${time}</td>
              <td width="40%">${title}</td>
              <td width="30%">
                <p>${content}</p>
                <a class="btn-copy" data-clipboard-text="${content}">複製</a>
              </td>
            </tr>`
          }
        })

        str += `</tbody></table>`;
      }
      return str
    },
    /**
     * @description: 渲染奖励配置
     * @param {*} configList
     */
    renderRewardConfig: function (configList) {
      let str = `<tbody>
                    <tr>
                      <th width="20%">合作點數</th>
                      <th colspan="2">虛寶內容</th>
                    </tr>`;
      if (configList.length > 0) {
        awardConfigList.push(...configList)
        console.log("后台奖励配置列表", awardConfigList)
        configList.map(({
          name,
          rewardCode,
          rewardCondition
        }) => {
          // const rewardConditionConfigArr = rewardCondition.split(',')[0].split('_')
          // const point = rewardConditionConfigArr[rewardConditionConfigArr.length - 1] ||
          //   ''
          const point = rewardCode.split('_')[rewardCode.split('_').length - 1]
          str +=
            `<tr>
                <td width="20%">${point}點</td>
                <td width="55%" class="info-t2">${name}</td>
                <td width="25%"><a data-rewardCode=${rewardCode} class="btn-receive"></a></td>
              </tr>`;
        })

        str += `</tbody>`;
      }
      return str
    },
  };
  business.init();
  window.Mover = Mover;
  window.business = business;
});