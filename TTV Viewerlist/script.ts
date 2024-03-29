namespace viewerlist {

    // Setup JSON Data Interfaces
    interface JSONData {
        _links: string;
        chatter_count: number;
        chatters: Chatters;
    }

    interface Chatters {
        broadcaster: string[];
        vips: string[];
        moderators: string[];
        staff: string[];
        admins: string[];
        global_mods: string[];
        viewers: string[];
    }

    // Setup HTML Buttons
    document.getElementById("send").addEventListener("click", setupEvent);
    document.getElementById("refresh").addEventListener("click", userEvent);
    document.getElementById("change").addEventListener("click", changeEvent);
    document.getElementById("hide").addEventListener("change", hideEvent);
    document.getElementById("reset").addEventListener("click", resetEvent);
    document.getElementById("range").addEventListener("input", updateEvent);
    document.getElementsByTagName("input")[1].value = "120";
    document.getElementsByTagName("div")[1].setAttribute("style", "display: none;");

    if (localStorage.getItem("uname") != null) {
        document.getElementsByClassName("setup")[0].innerHTML = "";
        document.getElementsByClassName("setup")[0].setAttribute("style", "height: 0; padding: 0; border: 0;");
        document.getElementsByTagName("div")[1].setAttribute("style", "display: inline;");
    }

    // Setup refresh countdown
    let countdown: HTMLParagraphElement = document.createElement("p");
    countdown.setAttribute("style", "position: absolute; top: 1ch; right: 1ch;");
    let ct: number = 0;
    function countingdown(interval: number): void {
        document.body.append(countdown);
        ct = interval;
        clearInterval();
        setInterval(function (): void {
            countdown.innerHTML = "Time until next refresh: " + ct + " sec";
            ct--;
        },          1000);
    }
    // Setup refresh countup
    let countup: HTMLParagraphElement = document.createElement("p");
    countup.setAttribute("style", "position: absolute; top: 3ch; right: 1ch;");
    let counter: number = 0;
    function countingup(): void {
        document.body.appendChild(countup);
        clearInterval();
        counter = 0;
        setInterval(function (): void {
            countup.innerHTML = "Time since last refresh: " + counter + " sec";
            counter++;
        },          1000);
    }

    // For when hitting the 'Get Viewers' button
    function setupEvent(): void {
        let username: string = "";
        if (localStorage.getItem("uname") == null) {
            username = document.getElementsByTagName("input")[0].value.toLowerCase();
            localStorage.setItem("uname", username);
        } else {
            username = localStorage.getItem("uname");
        }
        refreshEvent(username);
        document.getElementsByTagName("title")[0].innerHTML = "TTV Viewerlist - " + username;
        document.getElementsByClassName("setup")[0].setAttribute("style", "display: none;");
        document.getElementsByTagName("div")[1].setAttribute("style", "display: inline;");

        let interval: number = parseInt(document.getElementsByTagName("input")[1].value);
        autoRefresh(interval);
        countingdown(interval);
        countingup();
    }

    // For when hitting the 'Manual Refresh' button
    function userEvent(): void {
        document.getElementsByTagName("title")[0].innerHTML = "TTV Viewerlist - " + localStorage.getItem("uname");
        refreshEvent(localStorage.getItem("uname"));
    }

    // For when changing the interval in the Setup Box
    function updateEvent(): void {
        document.getElementsByTagName("label")[0].innerHTML = document.getElementsByTagName("input")[1].value + "sec";
    }

    // Setup JSON Request
    let chat: JSONData;
    function refreshEvent(_username: string): void {
        let url: string = "https://tmi.twitch.tv/group/user/" + _username + "/chatters";
        async function ref(): Promise<void> {
            chat = await getJSON(url);
            console.log("JSON Fetch", chat);
            refreshLists(chat.chatters);
            counter = 0;
        }
        ref();
    }

    // JSON Request
    async function getJSON(_url: RequestInfo): Promise<JSONData> {
        let response: Response = await fetch(_url);
        console.log("Response JSON", response);
        return await response.json();
    }

    // Console Log / Info
    if (localStorage.getItem("uname") == null) {
        console.log("Setup is not complete, no user selected.");
    } else {
        if (localStorage.getItem("uname") == null) {
            console.log("No user was found in the LocalStorage");
        }
        else {
            console.log("User found in LocalStorage: " + localStorage.getItem("uname"));
            console.log("Hit 'Manual Refresh' to get the current Viewerlist of " + localStorage.getItem("uname") + " or hit 'Reset Setup' to select a different user.");
        }
    }

    // function for auto-refreshing the viewerlist
    function autoRefresh(interval: number): void {
        if (interval < 120) {
            alert("Note: Twitch only updates the user list every 2 minutes or so, therefore, anything below 120 seconds is basically unnecessary.\nYour specified interval will be set anyway. If you wish to change, that hit the 'Reset Setup' button.");
        }
        interval *= 1000;
        clearInterval();
        setInterval(function (): void {
            refreshEvent(localStorage.getItem("uname"));
            ct = parseInt(document.getElementsByTagName("input")[1].value);
        },          interval);
    }

    // Write usernames from JSON Data into HTML Textarea Elements
    let chArray: string[] = [];
    function refreshLists(list: Chatters): void {
        if (chat.chatter_count > 10000) {
            alert("The streamers audience is over 10k viewer. Loading all of the names may take a while. Be patient and don't close the Browser.");
        }

        let tfMods: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
        let tfVIPs: HTMLTextAreaElement = document.getElementsByTagName("textarea")[1];
        let tfViewers: HTMLTextAreaElement = document.getElementsByTagName("textarea")[2];
        let tfBroadcaster: HTMLTextAreaElement = document.getElementsByTagName("textarea")[3];
        let tfStaff: HTMLTextAreaElement = document.getElementsByTagName("textarea")[4];
        let tfAdmins: HTMLTextAreaElement = document.getElementsByTagName("textarea")[5];
        let tfGlobalMods: HTMLTextAreaElement = document.getElementsByTagName("textarea")[6];

        tfMods.innerHTML = "";
        for (let i: number = 0; i < list.moderators.length; i++) {
            tfMods.innerHTML += list.moderators[i] + "\n";
            document.getElementById("modCount").innerHTML = "Count: " + list.moderators.length;
        }
        tfVIPs.innerHTML = "";
        for (let i: number = 0; i < list.vips.length; i++) {
            tfVIPs.innerHTML += list.vips[i] + "\n";
            document.getElementById("vipCount").innerHTML = "Count: " + list.vips.length;
        }
        tfViewers.innerHTML = "";
        for (let i: number = 0; i < list.viewers.length; i++) {
            tfViewers.innerHTML += list.viewers[i] + "\n";
            document.getElementById("viewerCount").innerHTML = "Count: " + list.viewers.length;
        }
        tfBroadcaster.innerHTML = "";
        for (let i: number = 0; i < list.broadcaster.length; i++) {
            tfBroadcaster.innerHTML += list.broadcaster[i] + "\n";
        }
        tfStaff.innerHTML = "";
        for (let i: number = 0; i < list.staff.length; i++) {
            tfStaff.innerHTML += list.staff[i] + "\n";
        }
        tfAdmins.innerHTML = "";
        for (let i: number = 0; i < list.admins.length; i++) {
            tfAdmins.innerHTML += list.admins[i] + "\n";
        }
        tfGlobalMods.innerHTML = "";
        for (let i: number = 0; i < list.global_mods.length; i++) {
            tfGlobalMods.innerHTML += list.global_mods[i] + "\n";
        }

        let headingLarge: HTMLHeadingElement = document.getElementsByTagName("h1")[0];
        let headingSmall: HTMLHeadingElement = document.getElementsByTagName("h4")[0];
        let lastCount: number = parseInt(headingLarge.innerText);
        let diff: number = chat.chatter_count - lastCount;
        let sign: string = " ±";
        if (diff < 0) {
            headingSmall.style.color = "red";
            sign = " ";
        } else if (diff > 0) {
            headingSmall.style.color = "limegreen";
            sign = " +";
        } else {
            headingSmall.style.color = "white";
        }
        headingLarge.innerText = chat.chatter_count + "";
        headingSmall.innerText = sign + diff;
        let time: Date = new Date();
        let tm: string = ":";
        let ts: string = ":";
        if (time.getMinutes() < 10) { tm = ":0"; }
        if (time.getSeconds() < 10) { ts = ":0"; }
        let currentTime: string = time.getHours() + tm + time.getMinutes() + ts + time.getSeconds();
        chArray.push("[" + currentTime + "] " + chat.chatter_count + " |" + sign + diff);
    }

    // Hide Special Viewers and resize visible Textarea Elements
    function hideEvent(): void {
        if (document.getElementsByTagName("input")[0].checked == true) {
            document.getElementsByTagName("textarea")[0].style.height = "100vh";
            document.getElementsByTagName("textarea")[1].style.height = "100vh";
            document.getElementsByTagName("textarea")[2].style.height = "100vh";
            document.getElementsByClassName("special")[0].setAttribute("style", "display: none;");
        } else {
            document.getElementsByClassName("special")[0].setAttribute("style", "display: inline");
            document.getElementsByTagName("textarea")[0].style.height = "100%";
            document.getElementsByTagName("textarea")[1].style.height = "100%";
            document.getElementsByTagName("textarea")[2].style.height = "100%";
        }
    }

    // Reset Setup and clear LocalStorage
    function resetEvent(): void {
        if (confirm("This will reset your setup.\n ") == true) {
            localStorage.removeItem("uname");
            window.location.reload();
        }
    }

    function changeEvent(): void {
        let output: string = "";
        for (let key of chArray) {
            output += key + "\n";
        }
        console.log(output);
    }
}