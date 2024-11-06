// Data for visualizations
const data = [
    { Name: 'Premia Badam (Almonds)', Price: 451, DiscountedPrice: 329, Category: 'Grocery', SubCategory: 'Grocery/Dry Fruits' },
    { Name: 'Premia Badam (Almonds)', Price: 109, DiscountedPrice: 85, Category: 'Grocery', SubCategory: 'Grocery/Dry Fruits' },
    { Name: 'Premia Badam (Almonds)', Price: 202, DiscountedPrice: 175, Category: 'Grocery', SubCategory: 'Grocery/Dry Fruits' },
    { Name: 'Nutraj California Almonds (Badam)', Price: 599, DiscountedPrice: 349, Category: 'Grocery', SubCategory: 'Dry Fruits' },
    { Name: 'Nutraj California Almonds (Badam)', Price: 1549, DiscountedPrice: 659, Category: 'Grocery', SubCategory: 'Dry Fruits' }
  ];
  
  // 1. Pie Chart for Category Distribution
  const categoryData = [
    { Category: 'Grocery', count: 5 },
    { Category: 'Dry Fruits', count: 5 }
  ];
  
  const pieWidth = 500;
  const pieHeight = 500;
  const pieRadius = Math.min(pieWidth, pieHeight) / 2;
  
  const pieColor = d3.scaleOrdinal(d3.schemeCategory10);
  
  const pieSvg = d3.select('#pie-chart').append('svg')
    .attr('width', pieWidth)
    .attr('height', pieHeight)
    .append('g')
    .attr('transform', `translate(${pieRadius}, ${pieRadius})`);
  
  const pie = d3.pie().value(d => d.count);
  const arc = d3.arc().outerRadius(pieRadius - 10).innerRadius(0);
  
  const labelArc = d3.arc().outerRadius(pieRadius - 40).innerRadius(pieRadius - 40);
  
  const pieArcData = pie(categoryData);
  
  const pieG = pieSvg.selectAll('.slice')
    .data(pieArcData)
    .enter().append('g')
    .attr('class', 'slice');
  
  pieG.append('path')
    .attr('d', arc)
    .style('fill', d => pieColor(d.data.Category));
  
  pieG.append('text')
    .attr('transform', d => `translate(${labelArc.centroid(d)})`)
    .text(d => d.data.Category);
  
  
  // 2. Scatter Plot for Price vs Discounted Price
  const scatterWidth = 600;
  const scatterHeight = 400;
  
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Price)])
    .range([0, scatterWidth - 40]);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.DiscountedPrice)])
    .range([scatterHeight - 40, 0]);
  
  const scatterSvg = d3.select('#scatter-plot').append('svg')
    .attr('width', scatterWidth)
    .attr('height', scatterHeight)
    .append('g')
    .attr('transform', 'translate(20, 20)');
  
  scatterSvg.selectAll('.dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.Price))
    .attr('cy', d => yScale(d.DiscountedPrice))
    .attr('r', 5)
    .style('fill', 'steelblue');
  
  scatterSvg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${scatterHeight - 40})`)
    .call(d3.axisBottom(xScale).ticks(5));
  
  scatterSvg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale).ticks(5));
  
  scatterSvg.selectAll('.x-axis text')
    .attr('class', 'axis-label')
    .style('text-anchor', 'middle');
  
  scatterSvg.selectAll('.y-axis text')
    .attr('class', 'axis-label')
    .style('text-anchor', 'middle');
  
  
  // 3. Stacked Bar Chart for Price vs Discounted Price by SubCategory
  const barWidth = 800;
  const barHeight = 400;
  
  const barMargin = { top: 20, right: 40, bottom: 60, left: 50 };
  const barSvg = d3.select('#stacked-bar-chart').append('svg')
    .attr('width', barWidth + barMargin.left + barMargin.right)
    .attr('height', barHeight + barMargin.top + barMargin.bottom)
    .append('g')
    .attr('transform', `translate(${barMargin.left},${barMargin.top})`);
  
  const barXScale = d3.scaleBand()
    .domain(data.map(d => d.SubCategory))
    .range([0, barWidth])
    .padding(0.3);
  
  const barYScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Price + d.DiscountedPrice)])
    .range([barHeight, 0]);
  
  barSvg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => barXScale(d.SubCategory))
    .attr('y', d => barYScale(d.Price + d.DiscountedPrice))
    .attr('width', barXScale.bandwidth())
    .attr('height', d => barHeight - barYScale(d.Price + d.DiscountedPrice))
    .attr('fill', 'steelblue');
  
  barSvg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${barHeight})`)
    .call(d3.axisBottom(barXScale));
  
  barSvg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(barYScale).ticks(5));

    