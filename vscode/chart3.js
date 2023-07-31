function main3(){
    var svg = d3.select("svg"),
    margin = 250,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

    d3.select('#annotations').style('left',700 + 'px').style('top', 240 + 'px')
    .select('#value').text("-  New York's Fatality/Case Ratio decreased between 2023 to 2022 from 1.69% to 1.14%")

    d3.select('#annotations2').style('left',1170 + 'px').style('top', 380 + 'px')
    .select('#value').text("- Wyoming has a relatively low Fatality/Case Ratio at 1.07%. What does this mean? For every 100 Covid-19 Cases, 1.07 Resulted in a Death.")

    
    d3.select('#annotations3').style('left',380 + 'px').style('top', 210 + 'px')
    .select('#value').text("Hawaii became the last state to announce the end of universal indoor mask mandate. This signifies the states' successful combat against Covid-19.")
    

    svg.append("text").attr("transform", "translate(-35,540)").attr("x",50)
    .attr("y",50).attr("font-size","15px").text("Trigger Between Scenes Below")

    svg.append("text").attr("transform", "translate(150,-20)").attr("x",50)
    .attr("y",50).attr("font-size","24px").text("US States: Covid-19 Fatality/Case Ratio(%) Before 2023")

    svg.append("text").attr("transform", "translate(490,520)").attr("x",50)
    .attr("y",50).attr("font-size","18px").text("US States")

    svg.append("text").attr("transform", "translate(120,10)").attr("x",50)
    .attr("y",50).attr("font-size","15px").attr("fill","black").text("Info Messages: 1) This Bar Chart Displays Fatality/Case Ratio(%) for each US State before 2021. Hover over Bars for More Info.")
    svg.append("text").attr("transform", "translate(215,30)").attr("x",50)
    .attr("y",50).attr("font-size","15px").attr("fill","black").text("2) Toggle between 'Show Total Deaths & Cases' and 'Reshow Fatality/Case Ratio' Buttons to MouseOver Different Info.")

    var xScale = d3.scaleBand().range([0,width]).padding(0.1),
        yScale = d3.scaleLinear().range([height,0]);

    var g = svg.append("g").attr("transform", "translate("+100+","+100+")");
    d3.csv("01-01-2023.csv").then(function(data){
        xScale.domain(data.map(function(d){return d.Province_State;}));
        yScale.domain([0,3.83]);

        g.append("g").attr('transform', 'translate(0,'+height+')').call(
            d3.axisBottom(xScale)).selectAll("text")
            .style("text-anchor", "end").attr("transform", "rotate(-65)" )
            .attr("dx", "-.90em")
            .attr("dy", "-.05em")

        g.append("g").call(d3.axisLeft(yScale).tickFormat(function(d){
            return d + "%";}).ticks(4)).append("text")
            .attr("transform",'rotate(-90)').attr("y",-5)
        .attr('dy','-3em').attr('dx','-11em').attr('text-anchor','middle')
        .attr('fill','black').attr("font-size","16px").text('Case-Fatality Ratio(%)')
        d3.select('#button2').select('#name').text("Show Total Deaths & Cases ")
        d3.select('#button3').select('#name2').text("Reshow Fatality/Case Ratio **")

        g.selectAll(".bar").data(data).enter().append("rect")
        .attr("class","bar").on("mouseover", onMouseOver).on("mouseout", onMouseOut)
        .attr("x", function(d){return xScale(d.Province_State);})
        .attr("y", function(d){return yScale(d.Case_Fatality_Ratio);})
        .attr("width", xScale.bandwidth()).attr("height",function(d){
            return height - yScale(d.Case_Fatality_Ratio);});

            const button10 = document.getElementById("button2");
            button10.addEventListener("click", fun);
            function fun(){
                d3.select('#button3').select('#name2').text("Reshow Fatality/Case Ratio")
                d3.select('#button2').select('#name').text("Show Total Deaths & Cases **")
                /*svg.append("text").attr("transform", "translate(390,520)").attr("x",50)
                .attr("y",50).attr("font-size","18px").text("US States")*/
        
                g.selectAll(".bar2").data(data).enter().append("rect")
                .attr("class","bar").on("mouseover", onMouseOver2).on("mouseout", onMouseOut2)
                .attr("x", function(d){return xScale(d.Province_State);})
                .attr("y", function(d){return yScale(d.Case_Fatality_Ratio);})
                .attr("width", xScale.bandwidth()).attr("height",function(d){
                    return height - yScale(d.Case_Fatality_Ratio);});      
            }

    });

    function onMouseOver(d,i){
        /*d3.selectAll('#tooltip').style('left',xPos + 'px').style('top', yPos + 'px')
        .select('#value2').text("Click to See More")*/
        var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth()/2;
        var yPos = parseFloat(d3.select(this).attr('y')) /2 + height/2

        d3.select('#tooltip').style('left',xPos + 'px').style('top', yPos + 'px')
        .select('#value2').text(i.Province_State)
        d3.select('#tooltip').style('left',xPos + 'px').style('top', yPos + 'px')
        .select('#value').text(i.Case_Fatality_Ratio)

        d3.select('#tooltip').classed('hidden',false);

        d3.select(this).attr('class','highlight')
        
    }
    function onMouseOver2(d,i){
        /*d3.selectAll('#tooltip').style('left',xPos + 'px').style('top', yPos + 'px')
        .select('#value2').text("Click to See More")*/
        var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth()/2;
        var yPos = parseFloat(d3.select(this).attr('y')) /2 + height/2

        
        d3.selectAll('#tooltip2').style('left',xPos + 'px').style('top', yPos + 'px')
        .select('#value2').text(i.Deaths)
        d3.selectAll('#tooltip2').style('left',xPos + 'px').style('top', yPos + 'px').attr('class','highlight3')
        .select('#value3').text(i.Confirmed)
        
        d3.select('#tooltip2').classed('hidden',false);

        d3.select(this).attr('class','highlight2')
    }
    function onMouseOut(d,i){
        d3.select(this).attr('class','bar')
        d3.select('#tooltip').classed('hidden',true);

    }
    function onMouseOut2(d,i){
        d3.select(this).attr('class','bar')
        d3.select('#tooltip2').classed('hidden',true);

    }

}