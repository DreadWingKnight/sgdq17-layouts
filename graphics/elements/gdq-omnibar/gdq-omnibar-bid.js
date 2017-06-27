class GdqOmnibarBid extends Polymer.Element {
	static get is() {
		return 'gdq-omnibar-bid';
	}

	static get properties() {
		return {
			bid: {
				type: Object
			}
		};
	}

	enter() {
		const enterTL = new TimelineLite({
			onStart() {
				if (this.bid.id === 5788 || // Green Hill Zone Blindfolded
					this.bid.id === 5831) { // Blindfolded Majora
					this.$.background.startColor = '#7e31b2';
					this.$.background.endColor = '#4a196b';
					this.$.totalAndDelta.style.justifyContent = 'flex-start';
					this.$.bitsIcon.removeAttribute('hidden');
					this.$.total.text = this.bid.total.replace('$', '');
					this.$.total.startColor = '#e4ffff';
					this.$.total.endColor = '#94d9d0';
				}
			},
			callbackScope: this
		});
		enterTL.set(this.$.text, {y: '100%'});
		enterTL.add(this.$.background.enter('below'));
		enterTL.to(this.$.text, 0.334, {
			y: '0%',
			ease: Power1.easeInOut
		}, 0.2);
		return enterTL;
	}

	exit() {
		const exitTL = new TimelineLite();
		exitTL.add(this.$.background.exit('above'));
		exitTL.to(this.$.text, 0.334, {
			y: '-100%',
			ease: Power1.easeInOut
		}, 0.2);
		return exitTL;
	}

	formatDescription(bid) {
		return bid ? (bid.description || bid.name).replace('||', ' -- ') : 'Be the first to bid!';
	}

	formatTotal(bid) {
		switch (bid.type) {
			case 'challenge':
				return `${bid.total} / ${bid.goal}`;
			default:
				return bid.total;
		}
	}
}

customElements.define(GdqOmnibarBid.is, GdqOmnibarBid);
