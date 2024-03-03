const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    // console.log(data.posts)
    const cardContainer = document.getElementById('card-container');

    data.posts.forEach((item) => {
        // console.log(item);
        const div = document.createElement('div');
        // div.classList.add('card-body');
        div.innerHTML = `
        <div class="card-body">
                    <div class="flex p-10 gap-5 bg-[#f2f2ff]">
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
                            </div>
                        </div>
                    </div>


                </div>
        `
        cardContainer.appendChild(div);
        console.log(item)

    });
}
loadData();