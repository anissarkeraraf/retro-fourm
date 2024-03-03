const loadData = async (dataText = 'comedy') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${dataText}`);
    const data = await res.json();
    const cardContainer = document.getElementById('card-container');

    // Clear the cardContainer before adding the new card
    cardContainer.textContent = ''


    data.posts.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card-body">
                    <div class="flex p-2 lg:p-10 gap-5 bg-[#f2f2ff] rounded-xl drop-shadow-xl">
                        <img class="w-1/12 h-1/4 rounded-xl" src="${item.image}" alt="">
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
                            <button><img src="images/email 1.png" alt=""></button>
                        </div>
                            </div>
                        </div>
                        
                    </div>


                </div>
        `
        cardContainer.appendChild(div);
        // console.log(item)

    });

    // hidden loading spinner
    taggleLoadingSpinner(false);
}


const handleSearch = () => {
    taggleLoadingSpinner(true);
    const inputField = document.getElementById('search-box');
    const inputFieldText = inputField.value;
    console.log(inputFieldText)
    loadData(inputFieldText)
}

const taggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}



loadData();