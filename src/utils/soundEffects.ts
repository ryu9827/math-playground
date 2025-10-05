// 使用 Web Audio API 生成庆祝音效
export class SoundEffects {
	private audioContext: AudioContext | null = null

	constructor() {
		// 延迟初始化，避免在页面加载时立即创建
		if (typeof window !== 'undefined') {
			try {
				this.audioContext = new (window.AudioContext ||
					(window as any).webkitAudioContext)()
			} catch (e) {
				console.warn('Web Audio API not supported', e)
			}
		}
	}

	// 播放庆祝音效 1: 上升音阶
	playCelebration1() {
		if (!this.audioContext) return

		const ctx = this.audioContext
		const oscillator = ctx.createOscillator()
		const gainNode = ctx.createGain()

		oscillator.connect(gainNode)
		gainNode.connect(ctx.destination)

		oscillator.type = 'sine'
		const now = ctx.currentTime

		// 上升音阶: C -> E -> G -> C
		oscillator.frequency.setValueAtTime(261.63, now) // C4
		oscillator.frequency.setValueAtTime(329.63, now + 0.1) // E4
		oscillator.frequency.setValueAtTime(392.0, now + 0.2) // G4
		oscillator.frequency.setValueAtTime(523.25, now + 0.3) // C5

		gainNode.gain.setValueAtTime(0.3, now)
		gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5)

		oscillator.start(now)
		oscillator.stop(now + 0.5)
	}

	// 播放庆祝音效 2: 欢快的和弦
	playCelebration2() {
		if (!this.audioContext) return

		const ctx = this.audioContext
		const now = ctx.currentTime

		// 播放三个音符形成和弦
		const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5

		frequencies.forEach((freq) => {
			const oscillator = ctx.createOscillator()
			const gainNode = ctx.createGain()

			oscillator.connect(gainNode)
			gainNode.connect(ctx.destination)

			oscillator.type = 'triangle'
			oscillator.frequency.setValueAtTime(freq, now)

			gainNode.gain.setValueAtTime(0.2, now)
			gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6)

			oscillator.start(now)
			oscillator.stop(now + 0.6)
		})
	}

	// 播放庆祝音效 3: 铃铛声
	playCelebration3() {
		if (!this.audioContext) return

		const ctx = this.audioContext
		const now = ctx.currentTime

		for (let i = 0; i < 3; i++) {
			const oscillator = ctx.createOscillator()
			const gainNode = ctx.createGain()

			oscillator.connect(gainNode)
			gainNode.connect(ctx.destination)

			oscillator.type = 'sine'
			oscillator.frequency.setValueAtTime(800 + i * 200, now + i * 0.15)

			gainNode.gain.setValueAtTime(0.3, now + i * 0.15)
			gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.3)

			oscillator.start(now + i * 0.15)
			oscillator.stop(now + i * 0.15 + 0.3)
		}
	}

	// 播放庆祝音效 4: 成功提示音
	playCelebration4() {
		if (!this.audioContext) return

		const ctx = this.audioContext
		const now = ctx.currentTime

		const oscillator = ctx.createOscillator()
		const gainNode = ctx.createGain()

		oscillator.connect(gainNode)
		gainNode.connect(ctx.destination)

		oscillator.type = 'square'
		oscillator.frequency.setValueAtTime(440, now) // A4
		oscillator.frequency.setValueAtTime(554.37, now + 0.1) // C#5

		gainNode.gain.setValueAtTime(0.2, now)
		gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4)

		oscillator.start(now)
		oscillator.stop(now + 0.4)
	}

	// 随机播放一个庆祝音效
	playRandomCelebration() {
		const sounds = [
			() => this.playCelebration1(),
			() => this.playCelebration2(),
			() => this.playCelebration3(),
			() => this.playCelebration4(),
		]

		const randomSound = sounds[Math.floor(Math.random() * sounds.length)]
		randomSound()
	}
}

// 创建单例实例
export const soundEffects = new SoundEffects()
