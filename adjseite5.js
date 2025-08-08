(function () {
  const sentLinks = new Set();

  function extractLinks() {
    const container = document.querySelector("#bulten-event-list-container");
    if (!container) return [];

    const eventList = container.querySelectorAll(".event-list-mobile");
    const links = [];

    eventList.forEach((eventElement, index) => {
      // son iki elementi atla
      if (index >= eventList.length - 2) return;

      const moreLink = eventElement.querySelector(
        ".mbs-odds-more .content .more a"
      );

      if (moreLink && moreLink.href) {
        links.push(moreLink.href);
      }
    });

    return links;
  }

  function sendToFlutter(type, links) {
    window.postMessage(JSON.stringify({ type, links }));
  }

  function compareAndSend(newLinks) {
    const newLinkSet = new Set(newLinks);

    const addedLinks = newLinks.filter((link) => !sentLinks.has(link));
    const removedLinks = [...sentLinks].filter((link) => !newLinkSet.has(link));

    // Güncelle sentLinks
    addedLinks.forEach((link) => sentLinks.add(link));
    removedLinks.forEach((link) => sentLinks.delete(link));

    if (addedLinks.length > 0) {
      sendToFlutter("added", addedLinks);
    }

    if (removedLinks.length > 0) {
      sendToFlutter("removed", removedLinks);
    }
  }

  function handleUpdate(isInitial = false) {
    const links = extractLinks();

    if (isInitial) {
      links.forEach((link) => sentLinks.add(link));
      sendToFlutter("initial", links);
    } else {
      compareAndSend(links);
    }
  }

  // Sayfa ilk açıldığında tüm linkleri gönder
  handleUpdate(true);

  // DOM değişimlerini dinle
  const observerTarget = document.querySelector("#bulten-event-list-container");
  if (observerTarget) {
    const observer = new MutationObserver(() => {
      handleUpdate();
    });

    observer.observe(observerTarget, {
      childList: true,
      subtree: true,
    });
  }
})();
