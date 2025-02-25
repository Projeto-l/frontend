export function Icon(props) {

    const icons = {
        user: <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M226-262q59-39.666 121-60.833T480-344q71 0 133.333 21.167Q675.667-301.666 734.667-262q41-49.667 59.833-103.667 18.834-54 18.834-114.333 0-141-96.167-237.167T480-813.334q-141 0-237.167 96.167T146.666-480q0 60.333 19.167 114.333T226-262Zm253.876-184.667q-58.209 0-98.043-39.957Q342-526.581 342-584.791q0-58.209 39.957-98.042 39.958-39.834 98.167-39.834t98.043 39.958Q618-642.752 618-584.543q0 58.21-39.957 98.043-39.958 39.833-98.167 39.833ZM479.73-80q-83.097 0-156.183-31.5t-127.15-85.833q-54.064-54.334-85.23-127.227Q80-397.454 80-480.333q0-82.88 31.5-155.773Q143-709 197.333-763q54.334-54 127.227-85.5Q397.454-880 480.333-880q82.88 0 155.773 31.5Q709-817 763-763t85.5 127Q880-563 880-480.177q0 82.822-31.5 155.666T763-197.333Q709-143 635.914-111.5T479.73-80Z" /></svg>,
        users :<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>,
        email: <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M146.666-160q-27 0-46.833-19.833T80-226.666v-506.668q0-27 19.833-46.833T146.666-800h666.668q27 0 46.833 19.833T880-733.334v506.668q0 27-19.833 46.833T813.334-160H146.666ZM480-454.667l333.334-215.334v-63.333L480-521.333 146.666-733.334v63.333L480-454.667Z" /></svg>,
        emailp: <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M146.666-160q-27 0-46.833-19.833T80-226.666v-506.668q0-27 19.833-46.833T146.666-800h666.668q27 0 46.833 19.833T880-733.334v506.668q0 27-19.833 46.833T813.334-160H146.666ZM480-454.667l333.334-215.334v-63.333L480-521.333 146.666-733.334v63.333L480-454.667Z" /></svg>,
        passwd: <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M280-354q52.667 0 89.333-36.667Q406-427.333 406-480t-36.667-89.333Q332.667-606 280-606t-89.333 36.667Q154-532.667 154-480t36.667 89.333Q227.333-354 280-354Zm0 114q-100 0-170-70T40-480q0-100 70-170t170-70q83.667 0 142.167 46.333 58.5 46.334 81.833 117h341l75 75L788.667-331l-102-82.334L604-330.667l-74-74h-26q-21 74-82.667 119.334Q359.667-240 280-240Z" /></svg>,
        tel: <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M796-120q-119 0-240-55.5T333-333Q231-435 175.5-556T120-796q0-18.667 12.667-31.333Q145.333-840 164-840h147.333q14 0 24.333 9.833Q346-820.333 349.333-806L376-675.334q2 14.667-.667 26Q372.666-638 364.666-630l-99 100q24 41.667 52.5 78.5T381-381.333q35 35.667 73.667 65.5T536-262.666l94.667-96.667q9.667-10.333 23.167-14.5 13.5-4.167 26.833-2.167L806-349.333q14.667 4 24.333 15.5Q840-322.333 840-308v144q0 18.667-12.667 31.333Q814.667-120 796-120Z" /></svg>
    }
}