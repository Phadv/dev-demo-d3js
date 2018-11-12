import {Component, OnInit, enableProdMode, HostListener} from '@angular/core';
import * as d3 from 'd3';
import {TranslateService} from '@ngx-translate/core';
enableProdMode();

@Component({
  selector: 'app-chart4',
  templateUrl: './chart4.component.html',
  styleUrls: ['./chart4.component.css']
})
export class Chart4Component implements OnInit {

  index= 0;
  // index data now
  index_data= 0;
  // data change
  data_now: any= [];
  data_begin= [
    {month: '1', 平均: '10', 自社: '30', year: '2018'},
    {month: '2', 平均: '40', 自社: '50', year: '2018'},
    {month: '3', 平均: '20', 自社: '60', year: '2018'},
    {month: '4', 平均: '10', 自社: '10', year: '2018'},
    {month: '5', 平均: '50', 自社: '75', year: '2018'},
    {month: '6', 平均: '70', 自社: '40', year: '2018'},
    {month: '7', 平均: '40', 自社: '10', year: '2018'},
    {month: '8', 平均: '50', 自社: '10', year: '2018'},
    {month: '9', 平均: '75', 自社: '40', year: '2018'},
    {month: '10', 平均: '10', 自社: '50', year: '2018'},
    {month: '11', 平均: '50', 自社: '10', year: '2018'},
    {month: '12', 平均: '40', 自社: '90', year: '2018'},
    {month: '1', 平均: '30', 自社: '70', year: '2019'},
    {month: '2', 平均: '40', 自社: '50', year: '2019'},
    {month: '3', 平均: '20', 自社: '60', year: '2019'},
    {month: '4', 平均: '10', 自社: '10', year: '2019'},
    {month: '5', 平均: '50', 自社: '75', year: '2019'},
    {month: '6', 平均: '70', 自社: '40', year: '2019'},
    {month: '7', 平均: '40', 自社: '10', year: '2019'},
    {month: '8', 平均: '50', 自社: '10', year: '2019'},
    {month: '9', 平均: '75', 自社: '40', year: '2019'},
    {month: '10', 平均: '10', 自社: '50', year: '2019'},
    {month: '11', 平均: '50', 自社: '10', year: '2019'},
    {month: '12', 平均: '40', 自社: '90', year: '2019'},
    {month: '1', 平均: '40', 自社: '90', year: '2020'},
  ];
  private valueColum: string;
  constructor(private translate: TranslateService) {
  }
  ngOnInit() {
    this.translate.get('chart-4.value').subscribe((res: string) => {
      this.valueColum=res;
      this.renderChart(this.data_begin);
    });
  }
  renderChart(data_input) {
    const data = data_input;
    let i = 0;
    this.data_now = data.filter((currElement, index) => {
      if (index >= this.index && i <= 11 ) {
        i++;
        this.index_data = index;
        return currElement;
      }
    });
    const svg = d3.select('#graphic4'),
      margin = {top: 20, right: 20, bottom: 30, left: 75},
      width = + parseInt(d3.select('.box').style('width')) - margin.left - margin.right ,
      height = +svg.attr('height') - margin.top - margin.bottom,
      g = svg.append('g').attr('transform', 'translate(' + margin.right + ',' + margin.top + ')');
    svg.attr('width', parseInt(d3.select('.box').style('width')));
    const x0 = d3.scaleBand()
      .domain(d3.range(this.data_now.length))
      // chiều rộng các của biểu đồ
      .rangeRound([0, width])
      // margin giữa các côt chính
      .paddingInner(0.1);

    const x1 = d3.scaleBand();
    // margin giữa 2 côt
    const y = d3.scaleLinear()
    // chiều cao của biểu đồ
      .rangeRound([height, 0]);
    const z = d3.scaleOrdinal()
    // màu của 2 cột
      .range(['red', 'blue']);
    this.data_now['columns'] = ['month', '平均', '自社'];
    // key =["Trắng", "Xanh"]
    const keys = this.data_now['columns'].slice(1);

    //  ["CA", "TX", "NY", "FL", "IL", "PA"] data.map(function(d) { return d.month; })
    x0.domain(this.data_now.map(function (d) {
      return d.month;
    }));
    // chiều rộng côt chính  : x0.bandwidth() 137
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(this.data_now, function (d) {
      return d3.max(keys, function (key) {
        return d[key];
      });
    })]).nice();
    const dataFirst = this.data_now;
    const tooltip = d3.select('body').append('div').attr('class', 'tooltip');
    // x0(d.month) : dịch chuyển các cột với trục ox giá trị tăng dần
    const yAxis = d3.axisRight(y)
      .tickFormat(d =>  d + '%')
      .ticks(3, 's')
      .tickSize(width);

    g.append('g')
      .attr('class', 'axis')
      .style('color', '#808080')
      .style('stroke-width', 1.5)
      .style('stroke-opacity', 0.4)
      .call(yAxis)
      .append('text')
      .attr('transform', 'translate(' + 0 + ', 0)')
      .attr('x', parseInt(d3.select('.box').style('width'))  - margin.left - margin.right)
      .attr('y', y(y.ticks().pop()) + 0.5 - 10)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text(this.valueColum);
    g.append('g')
      .selectAll('g')
      .data(this.data_now)
      .enter().append('g')
      .attr('transform', function (d) {
        return 'translate(' + x0(d.month) + ',0)';
      })
      .selectAll('rect')
      .data(function (d) {
        return keys.map(function (key) {
          return {key: key, value: d[key]};
        });
      })
      .enter().append('rect')
      .attr('x', function (d) {
        return x1(d.key);
      })
      .attr('y', function (d) {
        return y(d.value);
      })
      .attr('class', 'y axis')
      .attr('width', x1.bandwidth())
      .attr('height', function (d) {
        return height - y(d.value);
      })
      .attr('fill', function (d) {
        return z(d.key);
      })
      .attr('cursor', 'pointer')
      .on('mousemove', function(d){
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'block')
          .style('text-align', 'center')
          .style('border', '1px solid ' + z(d.key))
          .style('padding', '5px')
          .style('border-radius', '5px')
          .style('opacity', '1')
          .style('color', z(d.key))
          .style('background', 'white')
          .html( (d.key) + '<br>' + '' + (d.value));
      })
      .on('mouseout', function(d){  tooltip.style('display', 'none').style('opacity', '0'); });

    g.append('g')
      .attr('class', 'axis bottom')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0).tickFormat((d , i ) => {
        return (d + '回' );
      }));

    const tickText = d3.selectAll(` .axis.bottom .tick text`);
    if (tickText.select('tspan.tick-year').empty()) {
      tickText.append('tspan').data(this.data_now)
        .text((d,i) => {
          return (((i == 0 || i == this.data_now.length - 1)) ? this.data_now[i]['year'] : '');
        }).attr('class', 'tick-year')
        .attr('dy', '1em')
        .attr('x',     0);
    }

    g.append('g').selectAll('text')
      .data([this.data_now[0]])
      .enter()
      .append('text')
      .text(function(d) {
        return '自社';
      })
      .attr('text-anchor', 'middle')
      .attr('x', function(d, i) {
        return   3 * x0.bandwidth() / 4;
      })
      .attr('y', function(d) {
        return  y((d['自社'] > (d['平均'])) ? d['自社'] : d['平均'])  - 14 ;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'blue');

    g.append('g').selectAll('text')
      .data([this.data_now[0]])
      .enter()
      .append('text')
      .text(function(d) {
        return '平均';
      })
      .attr('text-anchor', 'middle')
      .attr('x', function(d, i) {
        return  x0.bandwidth() / 4;
      })
      .attr('y', function(d) {
        return  y((d['自社'] > (d['平均'])) ? d['自社'] : d['平均'])  - 14  ;
      })
      .attr('font-family' , 'sans-serif' )
      .attr('font-size' , '11px' )
      .attr('fill' , 'red' );
  }
  btnPreview() {
    d3.select('#graphic4').select('g').remove();
    if (this.index > 0) {
      this.index--;
    }
    this.renderChart(this.data_begin);
  }
  btnNext() {
    if (this.data_begin.length !== this.index_data + 1) {
      d3.select('#graphic4').select('g').remove();
      this.index++;
      this.renderChart(this.data_begin);
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    d3.select('#graphic4').select('g').remove();
    this.renderChart(this.data_begin);
  }

}
