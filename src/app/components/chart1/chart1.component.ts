import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {
  constructor() { }
  public w;
  public h;
  public dataY;
  public xScale = [];
  public xData = [];
  public svg;
  public showYear = false;
  public fistYear;
  public lastYear;
  public firstData;
  public lastData;
  public txtYear;

  ngOnInit() {
    const elmnt = document.getElementById('graphic');
    this.w = elmnt.offsetWidth;
    this.h = 400;
    this.dataY = [0, 10, 20, 30, 40];
    this.svg = d3.select('#graphic')
      .append('svg')
      .attr('width', this.w)
      .attr('height', this.h);
    const fakeDataRed =  [ { 'year': 2018, 'month': 9, 'x': 39, 'y': 290},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 + 39, 'y': 280},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 2 + 39, 'y': 260},
      { 'year': 2018, 'month': 12, 'x': (this.w - 140) / 4 * 3 + 39, 'y': 270},
      { 'year': 2019, 'month': 1, 'x': this.w - 120, 'y': 250}];
    const customDataRed = [];
    fakeDataRed.forEach(data =>  {
      const obRed = {'year': 0, 'month': 0};
      obRed.year = data.year;
      obRed.month = data.month;
      customDataRed.push(obRed);
    });
    this.checkShowYear(customDataRed);
    this.handMonth(customDataRed);
    this.xScale = d3.scaleTime().domain([new Date(this.xData[0].year, this.xData[0].month),
      new Date(this.xData[this.xData.length - 1].year, this.xData[this.xData.length - 1].month)]);
    const fakeBlue =  [ { 'year': 2018, 'month': 9, 'x': 39, 'y': 280},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 + 39, 'y': 240},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 2 + 39, 'y': 220},
      { 'year': 2018, 'month': 12, 'x': (this.w - 140) / 4 * 3 + 39, 'y': 200},
      { 'year': 2019, 'month': 1, 'x': this.w - 120 , 'y': 190}];
    const fakeGray =  [ { 'year': 2018, 'month': 9, 'x': 39, 'y': 200},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 + 39, 'y': 180},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 2 + 39, 'y': 170},
      { 'year': 2018, 'month': 12, 'x': (this.w - 140) / 4 * 3 + 39, 'y': 160},
      { 'year': 2019, 'month': 1, 'x': this.w - 120 , 'y': 140}];
    this.renderChart(this.w, this.h, this.dataY, this.xScale, this.svg, fakeDataRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeDataRed, this.w, '250', 'red');
    this.drawLine(this.svg, fakeBlue, this.w, '190', 'blue');
    this.drawLine(this.svg, fakeGray, this.w, '140', 'gray');
    this.firstData = customDataRed[0];
    this.lastData = customDataRed[customDataRed.length - 1];
  }

  renderChart(w, h, dataY, xScale, svg, fakeRed, fakeBlue, fakeGray) {
    let yScale, yAxis, xAxis;
    const monthFormat  = d3.timeFormat('%m月');
    yScale = d3.scaleLinear()
      .domain([d3.min(dataY), d3.max(dataY)])
      .range([h, 100]);

    yAxis = d3.axisRight()
      .scale(yScale)
      .ticks(5)
      .tickFormat(d => d + '%');

    svg.append('g')
      .attr('class', 'gY')
      .attr('transform', 'translate(' + (w - 50) + ', -20)')
      .style('font-size', '20px')
      .attr('text-anchor', 'middle')
      .call(yAxis)
      .selectAll('.gY path, .gY line')
      .style('display', 'none');

    xScale.range([40, w - 120]);

    xAxis = d3.axisBottom().scale(xScale)
      .ticks(5)
      .tickFormat(d => {
        const month = monthFormat(d).replace(/^0/, '');
        return month;
      });
    // .tickFormat(d => {
    //   console.log('d', xScale);
    //   const month = monthFormat(d).replace(/^0/, '');
    //   return (d.getMonth() === 0) ? month + ' ' + d.getFullYear() :  month + ' ';
    // });

    svg.append('g')
      .attr('class', 'gX  ')
      .attr('transform', 'translate(0, 377)')
      .style('font-size', '20px')
      .call(xAxis)
      .selectAll('.gX path, .gX line')
      .style('display', 'none');
    // Add downline for xAsis
    // .call(function(t) {
    //   t.each(function (d) {
    //     const self = d3.select(this);
    //     const s = self.text().split(' ');
    //     self.text(null);
    //     self.append('tspan')
    //       .attr('x', 0)
    //       .attr('dy', 20)
    //       .text(s[0]);
    //     self.append('tspan')
    //       .attr('x', 0)
    //       .attr('dy', 30)
    //       .style('color', 'gray')
    //       .text(s[1]);
    //   });
    // });

    ////////////Render x line fuzzy//////////////
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 83)
      .attr('y2', 83);
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 155)
      .attr('y2', 155);
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 229)
      .attr('y2', 229);
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 307)
      .attr('y2', 307);
    svg.append('line')
      .attr('style', 'fill: none;stroke: #eaeaea;stroke-width: 1px;')
      .attr('x1', 0)
      .attr('x2', w - 80)
      .attr('y1', 377)
      .attr('y2', 377);

    ////////////Add Title//////////////
    svg.append('text')
      .attr('x', (w / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .attr('y', 20)
      .text('アクティブユーザー411');
    svg.append('text')
      .attr('x', (w / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .attr('y', 45)
      .text('2位／278社中');
    if (this.fistYear === this.lastYear) {
      this.txtYear = '(' + this.fistYear + '年)';
    } else {
      this.txtYear = '(' + this.fistYear + '年-' + this.lastYear + '年)';
    }
    svg.append('text')
      .attr('x', (w / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '26px')
      .attr('y', 70)
      .text(this.txtYear);

    ////////////Add ToolTip and Line when Hover//////////////
    const div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const mouseG = svg.append('g')
      .attr('class', 'mouse-over-effects');
    mouseG.append('path') // this is the black vertical line to follow mouse
      .attr('class', 'mouse-line')
      .style('stroke', '#eaeaea')
      .style('stroke-width', '3')
      .style('stroke-dasharray', '10,10')
      .style('opacity', '1');

    this.toolTip(svg, div, fakeRed, 'red');
    this.toolTip(svg, div, fakeBlue, 'blue');
    this.toolTip(svg, div, fakeGray, 'gray');

  }

  drawLine(svg, data, w, h, check) {
    if (check === 'red') {
      const valueline = d3.line()
        .x(function(d) { return (d.x); })
        .y(function(d) { return (d.y); });
      svg.append('path')
        .data([data])
        .attr('d', valueline)
        .attr('style', 'fill: none; stroke: #CB4A4C;stroke-width: 1.5px;');
      svg.append('text')
        .attr('style', 'fill:red;font-size:20px;')
        .attr('transform', 'translate(' + (w - 90) + ', ' + h + ')')
        .attr('text-anchor', 'middle')
        .text('平均');
    } else if (check === 'blue') {
      const valueline = d3.line()
        .x(function(d) { return (d.x); })
        .y(function(d) { return (d.y); });
      svg.append('path')
        .data([data])
        .attr('d', valueline)
        .attr('style', 'fill: none; stroke: #609FEE;stroke-width: 1.5px;');
      svg.append('text')
        .attr('style', 'fill:blue;font-size:20px;')
        .attr('transform', 'translate(' + (w - 90) + ', ' + h + ')')
        .attr('text-anchor', 'middle')
        .text('自社');
    } else {
      const valueline = d3.line()
        .x(function(d) { return (d.x); })
        .y(function(d) { return (d.y); });
      svg.append('path')
        .data([data])
        .attr('d', valueline)
        .attr('style', 'fill: none; stroke: #B2B2B2;stroke-width: 1.5px;');
      svg.append('text')
        .attr('style', 'fill:gray;font-size:20px;')
        .attr('transform', 'translate(' + (w - 90) + ', ' + h + ')')
        .attr('text-anchor', 'middle')
        .text('TOP');
    }
  }

  toolTip(svg, div, data, color) {
    svg.selectAll('dot')
      .data(data)
      .enter().append('circle')
      .attr('r', 4)
      .attr('class', color)
      .style('fill', color)
      .attr('cx', function(d) { return (d.x); })
      .attr('cy', function(d) { return (d.y); })
      .on('mouseover', function() {
        div .attr('addcss', color)
        d3.select('.mouse-line')
          .style('opacity', '1');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', '1');
        d3.selectAll('.mouse-per-line text')
          .style('opacity', '1');
        return div.style('opacity', '1');
      })
      .on('mousemove', function(d) {
        const mouse = d3.mouse(this);
        const value = (300 - (d.y - 83)) / 300 * 40;
        const number = value.toFixed(2);
        div	.html('<div style="font-size:16px">' + d.year + '事' + (d.month) + '者 12 事' +
          '</div><div style="float: left;font-size:16px">平均</div>' + '<div style="float: right;font-size:16px">' + number + '%</div>')
        d3.select('.mouse-line')
          .attr('d', function() {
            let d = 'M' + mouse[0] + ',' + 377;
            d += ' ' + mouse[0] + ',' + 83;
            return d;
          });
        return div.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select('.mouse-line')
          .style('opacity', '0');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', '0');
        d3.selectAll('.mouse-per-line text')
          .style('opacity', '0');
        return div.style('opacity', '0');
      });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomSetText(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkShowYear(d) {
    if (d[0].year === d[d.length - 1].year) {
      this.showYear = false;
      this.fistYear = this.lastYear = d[0].year;
    } else {
      this.showYear = true;
      this.fistYear = d[0].year;
      this.lastYear = d[d.length - 1].year;
    }
  }

  handMonth(data) {
    this.xData = [];
    data.forEach(value => {
      const ob = {'year': 0, 'month': 0};
      if (parseInt(value.month, 10) === 1) {
        ob.month = 12;
        ob.year = parseInt(value.year, 10) - 1;
      } else {
        ob.month = parseInt(value.month, 10) - 1;
        ob.year = value.year;
      }
      this.xData.push(ob);
    });
  }

  btnPreview() {
    d3.selectAll('#graphic svg > *').remove();
    const yRed = this.getRandomSetText(200, 230); // Set position text
    const yBlue = this.getRandomSetText(160, 180); // Set position text
    const yGray = this.getRandomSetText(120, 155); // Set position text
    const fakeRed =  [ { 'year': 2018, 'month': 8, 'x': 40, 'y': this.getRandomInt(220, 300)},
      { 'year': 2018, 'month': 9, 'x': (this.w - 140) / 4 + 30, 'y': this.getRandomInt(200, 260)},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 * 2 + 30, 'y': this.getRandomInt(180, 220)},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 3 + 30, 'y': this.getRandomInt(160, 260)},
      { 'year': 2018, 'month': 12, 'x': this.w - 120, 'y': yRed}];
    const fakeBlue =  [ { 'year': 2018, 'month': 8, 'x': 40, 'y': this.getRandomInt(220, 300)},
      { 'year': 2018, 'month': 9, 'x': (this.w - 140) / 4 + 30, 'y': this.getRandomInt(200, 230)},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 * 2 + 30, 'y': this.getRandomInt(190, 210)},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 3 + 30, 'y': this.getRandomInt(180, 190)},
      { 'year': 2018, 'month': 12, 'x': this.w - 120 , 'y': yBlue}];
    const fakeGray =  [ { 'year': 2018, 'month': 8, 'x': 40, 'y': this.getRandomInt(220, 300)},
      { 'year': 2018, 'month': 9, 'x': (this.w - 140) / 4 + 30, 'y': this.getRandomInt(200, 170)},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 * 2 + 30, 'y': this.getRandomInt(180, 150)},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 3 + 30, 'y': this.getRandomInt(160, 140)},
      { 'year': 2018, 'month': 12, 'x': this.w - 120 , 'y': yGray}];
    const lastDate = new Date(this.firstData.year, this.firstData.month);
    const firstDate = new Date(new Date(lastDate.setMonth( lastDate.getMonth() - 4 )));
    const xScale = d3.scaleTime().domain([new Date(firstDate.getFullYear(), firstDate.getMonth()),
      new Date(this.firstData.year, this.firstData.month)]);
    if (this.firstData.year === firstDate.getFullYear()) {
      this.showYear = false;
      this.fistYear = this.lastYear = this.firstData.year;
    } else {
      this.showYear = true;
      this.fistYear = firstDate.getFullYear();
      this.lastYear = this.firstData.year;
    }

    this.firstData.year = firstDate.getFullYear();
    this.firstData.month = firstDate.getMonth();
    this.lastData.year = lastDate.getFullYear();
    this.lastData.month = lastDate.getMonth();

    this.renderChart(this.w, this.h, this.dataY, xScale, this.svg, fakeRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeRed, this.w, yRed, 'red');
    this.drawLine(this.svg, fakeBlue, this.w, yBlue, 'blue');
    this.drawLine(this.svg, fakeGray, this.w, yGray, 'gray');
  }

  btnNext() {
    d3.selectAll('#graphic svg > *').remove();
    const yRed = this.getRandomSetText(200, 230); // Set position text
    const yBlue = this.getRandomSetText(160, 180); // Set position text
    const yGray = this.getRandomSetText(120, 155); // Set position text
    const fakeRed =  [ { 'year': 2018, 'month': 8, 'x': 39, 'y': this.getRandomInt(220, 300)},
      { 'year': 2018, 'month': 9, 'x': (this.w - 140) / 4 + 30, 'y': this.getRandomInt(200, 220)},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 * 2 + 30, 'y': this.getRandomInt(180, 250)},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 3 + 30, 'y': this.getRandomInt(160, 260)},
      { 'year': 2018, 'month': 12, 'x': this.w - 120, 'y': yRed}];
    const fakeBlue =  [ { 'year': 2018, 'month': 8, 'x': 39, 'y': this.getRandomInt(220, 300)},
      { 'year': 2018, 'month': 9, 'x': (this.w - 140) / 4 + 30, 'y': this.getRandomInt(180, 230)},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 * 2 + 30, 'y': this.getRandomInt(160, 210)},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 3 + 30, 'y': this.getRandomInt(150, 190)},
      { 'year': 2018, 'month': 12, 'x': this.w - 120 , 'y': yBlue}];
    const fakeGray =  [ { 'year': 2018, 'month': 8, 'x': 39, 'y': this.getRandomInt(220, 300)},
      { 'year': 2018, 'month': 9, 'x': (this.w - 140) / 4 + 30, 'y': this.getRandomInt(170, 200)},
      { 'year': 2018, 'month': 10, 'x': (this.w - 140) / 4 * 2 + 30, 'y': this.getRandomInt(150, 150)},
      { 'year': 2018, 'month': 11, 'x': (this.w - 140) / 4 * 3 + 30, 'y': this.getRandomInt(130, 140)},
      { 'year': 2018, 'month': 12, 'x': this.w - 120 , 'y': yGray}];
    const firstDate = new Date(this.lastData.year, this.lastData.month);
    const lastDate = new Date(new Date(firstDate.setMonth( firstDate.getMonth() + 4 )));
    const xScale = d3.scaleTime().domain([new Date(this.lastData.year, this.lastData.month),
      new Date(lastDate.getFullYear(), lastDate.getMonth())]);
    if (this.lastData.year === lastDate.getFullYear()) {
      this.showYear = false;
      this.fistYear = this.lastYear = lastDate.getFullYear();
    } else {
      this.showYear = true;
      this.fistYear = this.lastData.year;
      this.lastYear = lastDate.getFullYear();
    }
    this.firstData.year = firstDate.getFullYear();
    this.firstData.month = firstDate.getMonth();
    this.lastData.year = lastDate.getFullYear();
    this.lastData.month = lastDate.getMonth();
    this.renderChart(this.w, this.h, this.dataY, xScale, this.svg, fakeRed, fakeBlue, fakeGray);
    this.drawLine(this.svg, fakeRed, this.w, yRed, 'red');
    this.drawLine(this.svg, fakeBlue, this.w, yBlue, 'blue');
    this.drawLine(this.svg, fakeGray, this.w, yGray, 'gray');
  }
}
