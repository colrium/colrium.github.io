import {
	mdiGithub,
	mdiTwitter,
	mdiLinkedin,
	mdiWhatsapp,
	mdiInstagram,
} from "@mdi/js";
export const email = "colrium@gmail.com";

export const socialMedias = [
	{
		name: "GitHub",
		url: "https://github.com/colrium",
		mdiIcon: mdiGithub,
		color: "inherit",
	},
	{
		name: "Linkedin",
		url: "https://www.linkedin.com/in/mutugiringu",
		mdiIcon: mdiLinkedin,
		color: "#0077B5",
	},
	// {
	// 	name: "Instagram",
	// 	url: "https://www.instagram.com/mutugimiriti",
	// 	mdiIcon: mdiInstagram,
	// 	color: "#dd2a7b",
	// },
	// {
	// 	name: "Twitter",
	// 	url: "https://twitter.com/mutugiringu",
	// 	mdiIcon: mdiTwitter,
	// 	color: "#1DA1F2",
	// },

	{
		name: "Whatsapp",
		url: "https://api.whatsapp.com/send/?phone=254724146857&text=Hey+Mutugi",
		mdiIcon: mdiWhatsapp,
		color: "#25D366",
	},
];

export const experience = [
	[
		{
			title: "React Native Participant",
			place: "N17R Incubator, Almaty",
			date: "Jun 2018 - Aug 2018",
		},
		{
			title: "SWE Intern",
			place: "Yandex, Moscow",
			date: "Jun 2019 - Aug 2019",
		},
		{
			title: "Ethereum Foundation",
			place: "Blockchain Intern, Remote",
			date: "Jun 2020 - Aug 2020",
		},
		{
			title: "Frontend Engineer",
			place: "alabs.team, Almaty",
			date: `Jan 2021 - May 2021`,
		},
		{
			title: "SWE Intern",
			place: "Citadel, Hong Kong",
			date: "May 2021 - Aug 2021",
		},
		{
			title: "SWE Intern",
			place: "Jump Crypto, Singapore",
			date: "May 2022 - Current",
		},
	],
];
export const colors = { primary: "#3c67e3", secondary: "#25D366" };
