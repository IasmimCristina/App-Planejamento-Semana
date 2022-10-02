

//Uso da ideia do JQuery.
const $ = document.querySelector.bind(document);
//-------

//Funções para criar a navegação das tabs.

// function TabNavigation() {
  //Conteúdo html sendo pêgo.
  const html = {
    links: [...$('.task-area-week').children],
    contents: [...$('.all-tasks-days').children],
  }

  function hideAllTabsContent() {
    // const contents = html.contents.children
    html.contents.forEach(section => {
      section.style.display = "none";
    })
    // console.log(contents);
  }


  // function removeAllActiveClasses() {
  //   html.links.forEach(button => {
  //     button.className = button.className.replace(" checked-day", "")
  //   })
  // }

  // function showCurrentTabs(id) {
  //   const tabContent = $('#' + id)
  //   tabContent.style.display = "block";
  //   tabContent.className += " checkedTab"
  //    const idActiveTab = id;
  //   // console.log(idActiveTab); //Ela pode ser pêga?
    
  // }

  // function selectTab(event) {
  //   hideAllTabsContent()
  //   removeAllActiveClasses()
  //   const target = event.currentTarget
  //   showCurrentTabs(target.dataset.id)

  //   target.className += " checked-day" //Sinalização da aba aberta.
  // }

  // function listenerForChanges() {
  //   html.links.forEach(button => {
  //     button.addEventListener("click", selectTab)
  //   }
  //   )
  // }



  // function init() {
  //   hideAllTabsContent();
  //   listenerForChanges();
    let date = new Date();
    dayWeek = date.getDay();


    //Lógica para que apareça o dia de semana na ordem correta dos botões
    if (dayWeek === 0) {
      dayWeek = 6
    } else {
      dayWeek -= 1
    }
    // A aba do dia de semana atual aparecerá.
    currentDay = html.links[dayWeek];
    currentDay.className += " checked-day" //Sinalização da aba aberta.;

     
     console.log(currentDay);
     
     hideAllTabsContent();
    const tabContentId = currentDay.dataset.id;
    console.log(tabContentId);
  const tabContent = $('#' + tabContentId)
    tabContent.style.display = "block";
    tabContent.className += " checkedTab"
  //    const idActiveTab = id;
  //   // console.log(idActiveTab); //Ela pode ser pêga?
    

//   }

//   return {
//     init
//   }
// }



// window.addEventListener('load', () => {
//   const tabNavigation = TabNavigation()
//   tabNavigation.init()
// })


// console.log(html.links) 