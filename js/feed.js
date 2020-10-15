'use strict';

$(document).ready(function() {
	$.ajax({
		url: 'https://www.di.se/rss',
	}).done(function(data) {
		console.log(data);
		var items = $(data).find('item');

		for (var i = 0; i < 10; i++) {
			var item = $(items[i]);

			renderItem({
				'title': $(item).find('title').text(),
				'link': $(item).find('link').text(),
				'author': $(item).find('dc\\:creator').text(),
				'date': $(item).find('dc\\:date').text(),
				'thumbnail': $(item).find('media\\:content').attr('url')
			});
		}
	});
});

function renderItem(item) {	
	var title = $('<h2>', {'class': 'title'}).append(item.title);
	var author = $('<span>', {'class': 'author'}).append(item.author);
	var date = $('<span>', {'class': 'date'}).append(formatDate(item.date));

	var content = $('<div>', {'class': 'item_content'}).append(title, author, date);
	var link = $('<a>', {'href': item.link, 'target': '_blank'});
	var thumbnail = $('<div>', {'class': 'thumbnail'});

	if (item.thumbnail) {
		thumbnail.append($('<img>', {'src': item.thumbnail}));
	}

	var article = $('<li>').append(thumbnail, content);

	article.click(function() {
		openLink(item.link);
	});

	$('#feed ul').append(article);
}

function formatDate(date) {
	return date.replace("T", " ").replace("Z", "");
}

function openLink(link) {
	window.open(link, '_blank');
}
