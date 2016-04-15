import React, {Component} from 'react';

export default class ChestsList extends Component {
	constructor() {
		super();
	}

	showFloatingText(e) {
		let $target = $(e.currentTarget);
		let $curTarget = $target.find('.floating__text').addClass('show');
	}

	hideFloatingText(e) {
		let $target = $(e.currentTarget);
		$target.find('.floating__text').removeClass('show');
	}

	lazyLoad() {
		$(this.refs.chestIcon).removeAttr('data-lazy');
	}

	createMarkup(markup) {
		return {__html: markup};
	}

	render() {
		let chest = this.props.chest;
		let itemInfo = ItemInfo.findOne({id: chest.id}) || {infos: []};
		// let path = '//127.0.0.1:8181/' + chest.id + '.png';
		let path = '//static.pwsimulator.com/' + chest.id + '.png';

		return (
			<a 
				href={"/chest/" + chest.id} 
				title={chest.name} 
				className="chests__bag__container__inner__item floating chest"
				onMouseEnter={this.showFloatingText}
				onMouseLeave={this.hideFloatingText}
			>
				<img
					src={path}
					alt={chest.name} 
					ref="chestIcon"
					data-lazy={true}
					onLoad={this.lazyLoad.bind(this)}
				/>
				<div className="floating__text">
					<span>{chest.name}</span>
					<p>
						{itemInfo.infos.map((info) => (
							<span style={{color: info.color}} key={info.text} dangerouslySetInnerHTML={this.createMarkup(info.text)}>
								
							</span>
						))}
					</p>
				</div>
			</a>
		)
	}
}
