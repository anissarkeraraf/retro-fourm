const loadData = async (dataText = '') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${dataText}`);
    const data = await res.json();
    // console.log(data.posts)
    const cardContainer = document.getElementById('card-container');

    // Clear the cardContainer before adding the new card
    cardContainer.textContent = ''




    data.posts.forEach((item) => {
        let active = `<img class="w-3 h-3 absolute lg:left-[75px] left-8" src="images/Status (1).png" alt=""></img>`
        if (item.isActive) {

            active = `<img class="w-3 h-3 absolute lg:left-[75px] left-8" src="images/Status.png" alt=""></img>`
        }

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card-body">
                    <div class="flex p-2 lg:p-10 gap-5 bg-[#f2f2ff] rounded-xl drop-shadow-xl">
                        <img class="w-1/12 h-1/4 relative rounded-xl" src="${item.image}" alt="">
                        ${active}
                        <div>
                            <div class="flex mb-4">
                                <p># ${item.category}</p>
                                <p>Author: ${item.author.name}</p>
                            </div>
                            <h1 class="text-black font-bold mb-4">${item.title}</h1>
                            <p>${item.description}</p>
                            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                            <div class="flex gap-3 lg:gap-5">
                                <div class="flex gap-1">
                                    <img src="images/msg.png" alt="msg">
                                    <p>${item.comment_count}</p>
                                </div>
                                <div class="flex gap-1">
                                    <img src="images/eye.png" alt="">
                                    <p>${item.view_count}</p>
                                </div>
                                <div class="flex gap-1">
                                    <img src="images/clock.png" alt="">
                                    <p>${item.posted_time} min</p>
                                </div>
                                <div class=" flex justify-end">
                            <button onclick="handleClick(${item.id})" class="add-btn"><img src="images/email 1.png" alt=""></button>
                        </div>
                            </div>
                        </div>
                        
                    </div>


                </div>
        `
        div.innerText
        cardContainer.appendChild(div);

        // console.log(item)

    });

}




const handleSearch = () => {
    taggleLoadingSpinner(true);
    const inputField = document.getElementById('search-box');
    const inputFieldText = inputField.value;
    console.log(inputFieldText)
    loadData(inputFieldText)


}


const taggleLoadingSpinner = () => {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.remove('hidden');
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
    }, 2000);
}

const activeStatus = (isActive) => {
    const online = document.getElementById('online');
    const ofline = document.getElementById('ofline');
    if (isActive == 'true') {
        online.classList.remove('hidden')
    } else {
        ofline.classList.add('hidden')
    }
}



// Latest card container
const latestCardContainer = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();

    const latestContainer = document.getElementById('latest-card-container');

    data.forEach((card) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl p-8">
        <img class="rounded-xl" src="${card.cover_image}" alt="" />
    
        <div class="flex mt-4 mb-4">
            <img src="images/Frame (8).png" alt="">
            <h1 class="pl-2">${card.author.posted_date || 'No Publish Date'}</h1>
        </div>
        <p class="text-black font-bold mb-4">${card.title}</p>
        <p class="text-black opacity-60 mb-4">${card.description}</p>

        <div class="flex">
            <img class="w-1/6 rounded-full" src="${card.profile_image}" alt="">
            <div class="pl-4">
                <h1 class="text-black font-medium">${card.author.name}</h1>
                <h1 class="text-black opacity-60">${card.author.designation || 'Unknown'}</h1>
            </div>
        </div>
    </div>
        `
        latestContainer.appendChild(div)

        // console.log(card);
    })

}


const handleClick = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category${id}`);
    const data = await res.json();

    const selectedItem = data.posts.find(post => post.id === id);

    const currentMark = document.getElementById('mark');
    const currentMarkElement = currentMark.innerText;
    const currentElement = parseInt(currentMarkElement);
    const newScore = currentElement + 1;

    currentMark.innerText = newScore;
    // console.log(newScore);

    const container = document.createElement('div');
    container.classList.add('flex', 'justify-between', 'item-center', 'pt-3', 'pl-2', 'pr-2')
    container.style.backgroundColor = 'white'
    container.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    container.style.borderRadius = '10px'
    container.style.marginBottom = '16px'


    // Create and append the title
    const titleElement = document.createElement('h2');
    titleElement.textContent = selectedItem.title;
    container.appendChild(titleElement);

    titleElement.style.marginBottom = '16px'
    titleElement.style.color = 'black', 'bold';

    // Create and append the view_count
    const viewCountElement = document.createElement('p');

    viewCountElement.textContent =`${selectedItem.view_count}`;


    container.appendChild(viewCountElement);

    viewCountElement.style.opacity = '0.6';
    viewCountElement.style.color = 'black';

    const parentElement = document.getElementById('parent-container');
    parentElement.appendChild(container);
}



latestCardContainer();

loadData();

// handleClick()