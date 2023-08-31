import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.less']
})
export class QuizComponent implements OnInit {
  
  questionList:any[] = [];
  currentquestion: number = 0 ;

  counter: number = 600;
  timerSubscription: Subscription | undefined;
  formattedTime: string = '';
  answered: boolean = false;

  constructor(private router : Router) {
    
    this.questionList = [
      {
        "questionLabel": "Ưu điểm cơ sở dữ liệu",
        "options": [{
          "label": "Giảm dư thừa,nhất quán và toàn vẹn của dữ liệu",
          "correct": true
        },
        {
          "label": "Các thuộc tính được mô tả trong nhiều tệp dữ liệu khác nhau"
        },
        {
          "label": "Khả năng xuất hiện mâu thuẫn và không nhất quán dữ liệu"
        },
        {
          "label": "Xuất hiện dị thường thông tin "
        }]
      },
      {
        "questionLabel": "Cơ sở dữ liệu là",
        "options": [{
          "label": "Tập hợp có tổ chức các dữ liệu có liên quan luận lý với nhau",
          "correct": true
        },
        {
          "label": "Một tập các chương trình ứng dụng dữ liệu"
        },
        {
          "label": "Hệ quản trị cơ sở dữ liệu"
        },
        {
          "label": "Một tập file dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      {
        "questionLabel": "Người sử dụng có thể truy cập",
        "options": [{
          "label": "Phụ thuộc vào quyền truy cập",
          "correct": true
        },
        {
          "label": "Hạn chế"
        },
        {
          "label": "Một phần cơ sở dữ liệu"
        },
        {
          "label": "Toàn bộ cơ sở dữ liệu"
        }]
      },
      
    ];
  }

  backhome(){
    this.router.navigate(['/base/home']);

  }

  backcourse(){
    this.router.navigate(['/base/home/course'])
  }

  ngOnInit(): void {
    this.questionList.forEach(question => {
      question.selectedOptionIndex = null; 
    });


    const timer$ = interval(1000);
    this.timerSubscription = timer$.pipe(
      takeWhile(() => this.counter > 0)
    ).subscribe(() => {
      this.counter--;
      this.formatTime();
    });

    this.formatTime();
    
  }


selectOption(questionIndex: number, optionIndex: number): void {
  this.questionList[questionIndex].selectedOptionIndex = optionIndex;
  this.answered = true;

  if (questionIndex === this.currentquestion) {
    this.currentquestion++;
  }
}
  

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    } 
  }

  formatTime(): void {
    const minutes = Math.floor(this.counter / 60);
    const seconds = this.counter % 60;
    this.formattedTime = `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
  }

  formatNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
