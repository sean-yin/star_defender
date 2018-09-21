SELECT
	s.order_id,
	s.s1 AS '创建时间',
	s.s2,
	s.s3,
	s.s4,
	TIMEDIFF(s.s2, s.s1) AS '提交到创建间隔',
	LEFT (TIMEDIFF(s3, s2), 8) AS '差额1',
	LEFT (TIMEDIFF(s4, s2), 8) AS '差额2'
FROM
	(
		SELECT
			order_id,
			MAX( CASE active_id WHEN 'submit_pre' THEN active_time ELSE 0 END ) s1,
			MAX( CASE active_id WHEN 'pre_order' THEN active_time ELSE 0 END ) s2,
			MAX( CASE active_id WHEN 'OA_pre_pass_order' THEN active_time ELSE 0 END ) s3,
			MAX( CASE active_id WHEN 'verification_submit' THEN active_time ELSE 0 END ) s4
		FROM ect_active_log
		GROUP BY order_id
	) s