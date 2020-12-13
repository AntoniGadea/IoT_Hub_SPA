export {Solarpanel};
import {panelCard} from '../../templates/templates.js';

class Solarpanel{
    constructor(id,type,name,status,production,max,brand){
        this.id = id;
        this.name = name;
        this.production = production;
        this.status = status;
        this.type = type;
        this.max = max;
        this.brand = brand;
        this.card = panelCard;
        
        if(this.production == null){
            this.production = "100,101,102,102,102,103";
        }
    }

    createChart(){
        if(typeof(this.production) == "string")
            this.production = this.production.split(",");

        this.dataProduction = {
            labels: Solarpanel.genLabels(),
            datasets: [{
                label: "Power Production (KWh)",
                borderColor: "rgb(71, 161, 198)",
                backgroundColor: "rgb(176, 224, 243)",
                data: this.production,
              }]
        } ;
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                boxWidth: 80,
                fontColor: 'black'
              }
            }
          };

        let chartBox = document.querySelector(`#chart-`+this.id);
        
        this.chart = new Chart(chartBox, {
            type: 'line',
            data: this.dataProduction,
            options: this.chartOptions
          });

          this.startRandomValues();
    }

    randomize(){
        let newData = Math.floor(Math.random()*2);

        if(this.production.length>=5){
           this.production.shift();
        }

        if(Math.random()< 0.5){
            this.production[this.production.length] = (Number.parseInt(this.production[this.production.length-1]) + newData).toString();
        }else{
            this.production[this.production.length] = (Number.parseInt(this.production[this.production.length-1]) - newData).toString();
        }
        this.chart.data.labels = Solarpanel.genLabels();
    }

    static genLabels(){
        let labels = [];
        let date = new Date();

        for(let i=0;i<6;i++){
            let h;
            let min;

            h = date.getHours();
            min = date.getMinutes()-i;

            if(min > -1){
                labels[i] = h+`:`+min-- ;
            }else{
                h--;
                min = min+60;
                labels[i] = h+`:`+min-- ;
            }

        }
        return labels.reverse();
    }

    startRandomValues(){
        if(this.interval != null)
            window.clearInterval(this.interval);

        this.interval = window.setInterval(()=>{
            this.randomize();
            this.chart.update();
        },60000);
    }

}