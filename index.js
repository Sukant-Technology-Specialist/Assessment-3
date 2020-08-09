let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let p = document.getElementById('p1');
document.getElementById("select").addEventListener('change', function() {
    let value = document.getElementById("select").value.toLowerCase();
    console.log(value);
    if (value.length > 0) {
        let p1 = document.getElementById('p2');
        console.log("Test", value);
        
        let url = "https://api.nytimes.com/svc/topstories/v2/" + value + ".json?api-key=QxFg9q4oXI6Qd0oZ7GGzJZ9bVLGGISCy";
        fetch(url).then((response) => {
            return response.json();
        }).then((result) => {
            
            let arr = [];

            p.innerHTML = " ";
            p1.innerHTML = " ";
            let label = document.createElement("label");
            label.setAttribute("for", "select");
            label.innerHTML = "Select Subsection:";
            p1.appendChild(label);
            let select_option = document.createElement('select');
            select_option.setAttribute("id", "select_option");
            select_option.setAttribute("class", "custom-select mr-sm-2");
            select_option.innerHTML = "<option value='default'>--Select Subsection--</option>";
            for (let i = 0; i < result.results.length; i++) {
                let opt = "";
                if (result.results[i].subsection.length > 0) {
                    opt = result.results[i].subsection;
                }
                if (!arr.includes(opt) && opt != "") {
                    arr.push(opt);
                    select_option.innerHTML += "<option value=" + opt + ">" + opt + "</option>";
                }

            }
            p1.appendChild(select_option);
            p1.innerHTML += "<br><p><br></p>"
            let button = document.createElement("button");
            button.setAttribute("class", "btn btn-secondary");
            button.setAttribute("id", "but1");
            button.innerHTML = "Submit";
            p1.appendChild(button);
            let button_class = document.getElementById("but1");
            button_class.addEventListener('click', function() {
                if (arr.length > 0) {
                    p.innerHTML = "";
                    console.log(arr);
                    let sub_section = document.getElementById("select_option").value;
                    let sub_section_arr = [];
                    for (let i = 0; i < result.results.length; i++) {
                        if (sub_section == result.results[i].subsection) {
                            sub_section_arr.push(i);
                        }
                    }
                    for (let i = 0; i < sub_section_arr.length; i++) {
                        let row = document.createElement('div');
                        row.setAttribute('class', 'card mb-3');
                        row.setAttribute('id', 'row1');
                        row.setAttribute('style', 'max-width: 540px;');
                        let col = document.createElement('div');
                        col.setAttribute('class', 'row no-gutters');
                        col.setAttribute('id', 'col1');
                        
                        let div_collapse = document.createElement('div');
                        
                        let date = result.results[sub_section_arr[i]].published_date.substring(5, 7);
                        let num = months[Number(date) - 1];
                        
                        let str_date = num.toString() + " , " + result.results[sub_section_arr[i]].published_date.substring(0, 4);
                        div_collapse.setAttribute('class', 'col-md-8');
                        let div_collapse_child = document.createElement('div');
                        div_collapse_child.setAttribute('class', 'card-body');
                        let text = "";
                        for (let k = 0; k < result.results[sub_section_arr[i]].abstract.length; k++) {
                            text += result.results[sub_section_arr[i]].abstract.charAt(k);
                        }
                        let inner = `<p>${result.section}<br><b>${result.results[sub_section_arr[i]].byline}</b><br>
                ${str_date}<br>${text}<br><a href=${result.results[sub_section_arr[i]].url} target="_blank">Continue Reading....</a></p>`;
                        div_collapse_child.innerHTML = inner;
                        div_collapse.appendChild(div_collapse_child);
                        let div_collapse_child_image = document.createElement('div');
                        div_collapse_child_image.setAttribute('class', 'col-md-4');
                        div_collapse_child_image.innerHTML = `<img src=${result.results[sub_section_arr[i]].multimedia[1].url} class="card-img" width=200px height=250px >`;
                        col.appendChild(div_collapse);
                        col.appendChild(div_collapse_child_image);
                        row.appendChild(col);
                        p.appendChild(row);
                        document.body.appendChild(p);
                    }
                    //}

                }

            });

        }).catch((error) => {
            alert("Error");
        });
    }
});
