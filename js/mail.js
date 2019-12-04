/**
		 * 중복서브밋 방지
		 * 
		 * @returns {Boolean}
		 */
		var doubleSubmitFlag = false;
		function doubleSubmitCheck() {
			if (doubleSubmitFlag) {
				return doubleSubmitFlag;
			} else {
				doubleSubmitFlag = true;
				return false;
			}
		}
		function isValidSubmit(){
			if(doubleSubmitCheck()) return 0
			else return 1
		}
		$("#sendMail").submit(function (event) {
			event.preventDefault();
			const url = $(this).attr("action");
			const name = $("#name").val()
			const email = $("#email").val()
			const subject = $("#subject").val()
			const message = $("#message").val()
			console.log(url, name, email, subject, message)
			const confirmState = confirm("메일을 전송하시겠어요?")
			if(confirmState==true){
				$.ajax({
					url: url,
					dataType: 'text',
					type: 'POST',
					data: {
						'name': name,
						'email': email,
						'subject': subject,
						'message': message
					},
					success: (data) => {
						console.log("send mail success")
						alert("메일 전송이 완료되었습니다.")
						$("#name").val('')
						$("#email").val('')
						$("#subject").val('')
						$("#message").val('')
					},
					error: (err) => {
						console.log("send mail err")
						alert("메일 전송이 실패했습니다.")
					},
					complete: () => {
						console.log("mail complete")
					}
				})
			}
		});