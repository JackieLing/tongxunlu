console.log(data);
function search() {
  //先拿到input框里面的输入值
  var value = document.getElementById("input").value;
  var people = data.filter(function(item){
    if(value==item.name){
        return item;
    }
  })
  if(value && people.length>=1){
    document.getElementById("img").src = people[0].imgsrc;
    document.getElementById("age").innerHTML = people[0].age;
    document.getElementById("sex").innerHTML = people[0].sex;
    document.getElementById("telephone").innerHTML = people[0].telephone;
  }else{
      alert("该教师不存在");
  }
}

